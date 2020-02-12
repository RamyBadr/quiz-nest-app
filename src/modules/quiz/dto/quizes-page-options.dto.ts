import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';
import {
    IsString,
    IsOptional,
    IsIn,
    IsUUID,
    IsBoolean,
    IsBooleanString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/UserDto';
import { IQuizFilterDto } from './QuizFilterDto';

export class QuizsPageOptionsDto extends PageOptionsDto
    implements IQuizFilterDto {
    id: string;
    @IsString()
    @IsUUID()
    @IsOptional()
    @ApiModelProperty({ required: false })
    author_id: string;

    @IsBooleanString()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    ispublished: boolean;

    author: UserDto;

    constructor(
        author: UserDto = null,
        ispublished: boolean = null,
        author_id: string = null,
    ) {
        super();
        if (author) {
            this.author_id = author.id;
        }
        if (author_id) {
            this.author.id = author_id;
        }
        if (ispublished !== null) {
            this.ispublished = ispublished;
        }
    }
}
