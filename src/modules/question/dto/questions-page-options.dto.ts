import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';
import {
    IsString,
    IsOptional,
    IsIn,
    IsUUID,
    IsBoolean,
    IsBooleanString,
    IsNotEmpty,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class QuestionsPageOptionsDto extends PageOptionsDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    quizId: string;

    @IsBooleanString()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    ispublished: boolean;
}
