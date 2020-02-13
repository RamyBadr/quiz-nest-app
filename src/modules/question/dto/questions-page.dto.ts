import { QuestionDto } from './QuestionDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';

export class QuestionsPageDto {
    @ApiModelProperty({
        type: QuestionDto,
        isArray: true,
    })
    readonly data: QuestionDto[];

    @ApiModelProperty()
    readonly meta: PageMetaDto;

    constructor(data: QuestionDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
