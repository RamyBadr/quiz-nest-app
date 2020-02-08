'use strict';

import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { QuizEntity } from '../quiz.entity';

export class QuizDto extends AbstractDto {
    @ApiModelProperty()
    title: string;

    @ApiModelProperty()
    ispublished: boolean;

    @ApiModelProperty()
    authorId: string;

    constructor(quiz: QuizEntity) {
        super(quiz);
        this.title = quiz.title;
        this.ispublished = quiz.ispublished;
        this.authorId = quiz.authorId;
    }
}
