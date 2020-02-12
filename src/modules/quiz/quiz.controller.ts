'use strict';

import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    Post,
    Body,
    Patch,
    Param,
    NotFoundException,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiUseTags,
    ApiOkResponse,
    ApiModelProperty,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
// import { AuthQuiz } from '../../decorators/auth-quiz.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
// import { AuthQuizInterceptor } from '../../interceptors/auth-quiz-interceptor.service';
import { QuizsPageOptionsDto } from './dto/quizes-page-options.dto';
import { QuizsPageDto } from './dto/quizes-page.dto';
import { QuizEntity } from './quiz.entity';
import { QuizService } from './quiz.service';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { QuizDto } from './dto/QuizDto';
import { IQuizFilterDto } from './dto/QuizFilterDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../user/user.entity';
import { QuizCreateDto } from './dto/QuizCreateDto';
import { QuizUpdateDto, QuizIdParamsDto } from './dto/QuizUpdateDto';
import { QuestionDto } from '../question/dto/QuestionDto';
import { QuestionEntity } from '../question/question.entity';
import { AnswerEntity } from '../answer/answer.entity';

@Controller('quizes')
@ApiUseTags('quizes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: QuizDto, description: 'Successfully created' })
    async createQuiz(
        @Body() quizDto: QuizCreateDto,
        @AuthUser() user: UserEntity,
    ): Promise<QuizDto> {
        const createdQuiz = await this.quizService.createQuiz(
            { ...quizDto },
            user.toDto(),
        );
        return createdQuiz.toDto();
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    updateOne(
        // @ApiModelProperty({type:string})
        @Param()
        updateQuizParam: QuizIdParamsDto,
        @Body() quizDto: QuizUpdateDto,
        @AuthUser() user: UserEntity,
    ): any {
        // logic
        const result = this.quizService.updateQuiz(
            quizDto,
            updateQuizParam.id,
            user.toDto(),
        );

        return result;
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher, RoleType.User)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    async getOne(
        // @ApiModelProperty({type:string})
        @Param()
        getQuizParam: QuizIdParamsDto,
        @AuthUser() user: UserEntity,
    ): Promise<QuizDto> {
        const filter: IQuizFilterDto = { id: getQuizParam.id };

        filter.role = user.role;
        // filter.id = getQuizParam.id;
        if (user.role == RoleType.Teacher) {
            filter.author = user.toDto();
        }
        const quiz = await this.quizService.getOne(filter, user.role);
        if (!quiz) {
            throw new NotFoundException();
        }
        return quiz ? quiz.toDto() : {};
    }
    @Get('')
    @Roles(RoleType.Teacher, RoleType.User)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get quizes list',
        type: QuizsPageDto,
    })
    getQuizs(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: QuizsPageOptionsDto,
        @AuthUser() user: UserEntity,
    ): Promise<QuizsPageDto> {
        if (user.role == RoleType.Teacher) {
            pageOptionsDto.author_id = user.id;
            pageOptionsDto.author = user.toDto();
        } else {
            pageOptionsDto.ispublished = true;
        }
        return this.quizService.getQuizs(pageOptionsDto);
    }
}
