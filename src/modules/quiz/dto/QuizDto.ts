'use strict';

import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { QuizEntity } from '../quiz.entity';
import { UserData } from 'aws-sdk/clients/ec2';
import { UserDto } from '../../user/dto/UserDto';
import { QuestionDto } from '../../question/dto/QuestionDto';
import { RoleType } from 'aws-sdk/clients/cognitoidentity';

export class QuizDto extends AbstractDto {
    @ApiModelProperty()
    title: string;

    @ApiModelProperty()
    ispublished: boolean;

    @ApiModelProperty()
    author: UserDto;

    @ApiModelProperty()
    questions: QuestionDto[];

    role: RoleType;
    constructor(quizEntity: QuizEntity) {
        super(quizEntity);
        this.title = quizEntity.title;
        this.ispublished = quizEntity.ispublished;
        if (quizEntity.author) {
            this.author = quizEntity.author.toDto();
        }
        if (quizEntity.questions) {
            this.questions = quizEntity.questions.toDtos();
        }
    }
}
