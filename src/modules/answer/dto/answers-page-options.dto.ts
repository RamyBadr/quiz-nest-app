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

export class AnswersPageOptionsDto extends PageOptionsDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    questionId: string;

    @IsBooleanString()
    @IsOptional()
    @ApiModelProperty({ required: false, type: Boolean })
    iscorrect: boolean;
}
