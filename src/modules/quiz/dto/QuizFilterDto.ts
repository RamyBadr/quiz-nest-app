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
import { QuizsPageOptionsDto } from './quizes-page-options.dto';
import { UserDto } from '../../user/dto/UserDto';
import { UserEntity } from '../../user/user.entity';
import { UserRepository } from '../../user/user.repository';
import { RoleType } from 'aws-sdk/clients/cognitoidentity';

export interface IQuizFilterDto {
    id?: string;
    author_id?: string;
    author?: UserDto;
    ispublished?: boolean;
    role?: RoleType;
    question?: {
        ispublished?: boolean;
    };
}
export class QuizFilterDto {
    readonly author_id: string;
    readonly author: any;
    readonly ispublished: boolean;
    constructor(pageOptionsDto: IQuizFilterDto) {
        // console.log(pageOptionsDto, 'pageOptionsDto passed');
        if (pageOptionsDto.author_id) {
            this.author_id = pageOptionsDto.author_id;
            this.author = { id: this.author_id };
        }
        if (pageOptionsDto.author) {
            this.author = pageOptionsDto.author;
        }
        if (pageOptionsDto.ispublished) {
            this.ispublished = <boolean>pageOptionsDto.ispublished;
        }
    }
}
