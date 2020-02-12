import { AnswerDto } from './AnswerDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';

export class AnswersPageDto {
    @ApiModelProperty({
        type: AnswerDto,
        isArray: true,
    })
    readonly data: AnswerDto[];

    @ApiModelProperty()
    readonly meta: PageMetaDto;

    constructor(data: AnswerDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
