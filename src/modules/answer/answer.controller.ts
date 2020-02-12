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
// import { AuthAnswer } from '../../decorators/auth-answer.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
// import { AuthAnswerInterceptor } from '../../interceptors/auth-answer-interceptor.service';
import { AnswersPageOptionsDto } from './dto/answers-page-options.dto';
import { AnswersPageDto } from './dto/answers-page.dto';
import { AnswerEntity } from './answer.entity';
import { AnswerService } from './answer.service';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { AnswerDto } from './dto/AnswerDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../user/user.entity';
import { AnswerCreateDto } from './dto/AnswerCreateDto';
import { AnswerUpdateDto, AnswerUpdateParamsDto } from './dto/AnswerUpdateDto';
import { QuestionEntity } from '../question/question.entity';

@Controller('answers')
@ApiUseTags('answers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Roles(RoleType.Teacher)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: AnswerDto, description: 'Successfully created' })
    async createAnswer(
        @Body() answerDto: AnswerCreateDto,
        @AuthUser() user: UserEntity,
    ): Promise<AnswerDto> {
        const question = new QuestionEntity();
        question.id = answerDto.questionId;
        delete answerDto.questionId;
        const createdAnswer = await this.answerService.createAnswer(
            {
                ...answerDto,
            },
            question,
        );
        return createdAnswer.toDto();
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
        updateAnswerParam: AnswerUpdateParamsDto,
        @Body() answerDto: AnswerUpdateDto,
        @AuthUser() user: UserEntity,
    ): any {
        const result = this.answerService.updateAnswer(
            answerDto,
            updateAnswerParam.id,
        );
        return result;
    }
    @Get('answers')
    @Roles(RoleType.Teacher, RoleType.User)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get answers list',
        type: AnswersPageDto,
    })
    getAnswers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: AnswersPageOptionsDto,
        @AuthUser() user: UserEntity,
    ): Promise<AnswersPageDto> {
        if (user.role == RoleType.Teacher) {
            // pageOptionsDto.questionId = user.id;
        } else {
            pageOptionsDto.iscorrect = true;
        }
        return this.answerService.getAnswers(pageOptionsDto);
    }
}
