import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class UsersPageOptionsDto extends PageOptionsDto {
    @IsString()
    @IsOptional()
    @IsIn(['User', 'Teacher'])
    @ApiModelProperty({ required: false })
    readonly role: string;
}
