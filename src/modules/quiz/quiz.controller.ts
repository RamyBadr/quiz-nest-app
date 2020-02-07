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
import { QuizsPageOptionsDto } from './dto/quizs-page-options.dto';
import { QuizsPageDto } from './dto/quizs-page.dto';
import { QuizEntity } from './quiz.entity';
import { QuizService } from './quiz.service';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { QuizDto } from './dto/QuizDto';

@Controller('quizs')
@ApiUseTags('quizs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class QuizController {
    constructor(private _quizService: QuizService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: QuizDto, description: 'Successfully created' })
    async createQuiz(@Body() quizDto: QuizDto): Promise<QuizDto> {
        const createdQuiz = await this._quizService.createQuiz(quizDto);
        return createdQuiz.toDto();
    }

    @Get('quizs')
    // @Roles(RoleType.Teacher, RoleType.User)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get quizs list',
        type: QuizsPageDto,
    })
    getQuizs(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: QuizsPageOptionsDto,
    ): Promise<QuizsPageDto> {
        return this._quizService.getQuizs(pageOptionsDto);
    }
}
