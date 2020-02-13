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
import { QuestionsPageOptionsDto } from './questions-page-options.dto';
import { QuizDto } from '../../quiz/dto/QuizDto';
import { QuizEntity } from '../../quiz/quiz.entity';

export class QuestionFilterDto {
    readonly quizId: string;
    readonly ispublished: boolean;
    quiz: QuizDto;
    constructor(pageOptionsDto: QuestionsPageOptionsDto) {
        if (pageOptionsDto.quizId) {
            console.log(pageOptionsDto.quizId, 'quizId passed to filter');
            const quizEntity = new QuizEntity();
            quizEntity.id = pageOptionsDto.quizId;
            this.quiz = quizEntity.toDto();
            this.quizId = pageOptionsDto.quizId;
        }
        if (pageOptionsDto.ispublished) {
            this.ispublished = <boolean>pageOptionsDto.ispublished;
        }
    }
}
