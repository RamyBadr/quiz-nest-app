'use strict';

import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { QuizDto } from '../../quiz/dto/QuizDto';
import { QuizEntity } from '../../quiz/quiz.entity';

export class QuestionCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    text: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty()
    quizId: string;
}
