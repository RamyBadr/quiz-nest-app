'use strict';

import {
    IsString,
    IsEmail,
    MinLength,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsIn,
    IsUUID,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { AnswersPageOptionsDto } from './answers-page-options.dto';
import { QuestionDto } from '../../question/dto/QuestionDto';
import { QuestionEntity } from '../../question/question.entity';

export class AnswerFilterDto {
    readonly questionId: string;
    readonly iscorrect: boolean;
    question: QuestionDto;
    constructor(pageOptionsDto: AnswersPageOptionsDto) {
        if (pageOptionsDto.questionId) {
            const questionEntity = new QuestionEntity();
            questionEntity.id = pageOptionsDto.questionId;
            this.question = questionEntity.toDto();
            this.questionId = pageOptionsDto.questionId;
        }
        if (pageOptionsDto.iscorrect) {
            this.iscorrect = <boolean>pageOptionsDto.iscorrect;
        }
    }
}
