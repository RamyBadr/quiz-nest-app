'use strict';

import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { AnswerEntity } from '../answer.entity';
import { QuestionDto } from '../../question/dto/QuestionDto';

export class AnswerDto extends AbstractDto {
    @ApiModelProperty()
    text: string;

    @ApiModelProperty({ default: false })
    iscorrect: boolean;

    @ApiModelProperty()
    question: QuestionDto;

    constructor(answer: AnswerEntity) {
        super(answer);
        this.text = answer.text;
        this.iscorrect = answer.iscorrect;
        if (answer.question) {
            this.question = answer.question.toDto();
        }
    }
}
