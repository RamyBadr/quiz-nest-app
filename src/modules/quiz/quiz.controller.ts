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
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiUseTags,
    ApiOkResponse,
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
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../user/user.entity';
import { QuizCreateDto } from './dto/QuizCreateDto';

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
        const createdQuiz = await this.quizService.createQuiz(quizDto, user);
        return createdQuiz.toDto();
    }

    @Get('quizes')
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
    ): Promise<QuizsPageDto> {
        return this.quizService.getQuizs(pageOptionsDto);
    }
}
