'use strict';

import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { QuestionEntity } from '../question.entity';
import { QuizDto } from '../../quiz/dto/QuizDto';
import { AnswerDto } from '../../answer/dto/AnswerDto';

export class QuestionDto extends AbstractDto {
    @ApiModelProperty()
    text: string;

    @ApiModelProperty({ default: false })
    ispublished: boolean;

    @ApiModelProperty()
    quiz: QuizDto;

    @ApiModelProperty()
    answers: AnswerDto[];

    constructor(question: QuestionEntity) {
        super(question);
        this.text = question.text;
        this.ispublished = question.ispublished;
        if (question.quiz) {
            this.quiz = question.quiz.toDto();
        }
        if (question.answers) {
            this.answers = question.answers.toDtos();
        }
    }
}
