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
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiUseTags,
    ApiOkResponse,
    ApiModelProperty,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
// import { AuthQuestion } from '../../decorators/auth-question.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
// import { AuthQuestionInterceptor } from '../../interceptors/auth-question-interceptor.service';
import { QuestionsPageOptionsDto } from './dto/questions-page-options.dto';
import { QuestionsPageDto } from './dto/questions-page.dto';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { QuestionDto } from './dto/QuestionDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../user/user.entity';
import { QuestionCreateDto } from './dto/QuestionCreateDto';
import {
    QuestionUpdateDto,
    QuestionUpdateParamsDto,
} from './dto/QuestionUpdateDto';
import { QuizService } from '../quiz/quiz.service';
import { QuizEntity } from '../quiz/quiz.entity';

@Controller('questions')
@ApiUseTags('questions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: QuestionDto, description: 'Successfully created' })
    async createQuestion(
        @Body() questionDto: QuestionCreateDto,
        @AuthUser() user: UserEntity,
    ): Promise<QuestionDto> {
        const quiz = new QuizEntity();
        quiz.id = questionDto.quizId;
        delete questionDto.quizId;
        const createdQuestion = await this.questionService.createQuestion(
            {
                ...questionDto,
            },
            quiz,
        );
        return createdQuestion.toDto();
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
        updateQuestionParam: QuestionUpdateParamsDto,
        @Body() questionDto: QuestionUpdateDto,
        @AuthUser() user: UserEntity,
    ): any {
        const result = this.questionService.updateQuestion(
            questionDto,
            updateQuestionParam.id,
        );
        return result;
    }
    @Get('questions')
    @Roles(RoleType.Teacher, RoleType.User)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get questions list',
        type: QuestionsPageDto,
    })
    getQuestions(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: QuestionsPageOptionsDto,
        @AuthUser() user: UserEntity,
    ): Promise<QuestionsPageDto> {
        if (user.role == RoleType.Teacher) {
            // pageOptionsDto.quizId = user.id;
        } else {
            pageOptionsDto.ispublished = true;
        }
        return this.questionService.getQuestions(pageOptionsDto);
    }
}
