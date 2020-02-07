'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { QuizEntity } from '../quiz.entity';

export class QuizDto extends AbstractDto {
    @ApiModelPropertyOptional()
    title: string;

    @ApiModelPropertyOptional()
    ispublished: boolean;

    @ApiModelPropertyOptional()
    email: string;

    @ApiModelPropertyOptional()
    avatar: string;

    @ApiModelPropertyOptional()
    phone: string;

    constructor(quiz: QuizEntity) {
        super(quiz);
        this.title = quiz.title;
        this.ispublished = quiz.ispublished;
    }
}
