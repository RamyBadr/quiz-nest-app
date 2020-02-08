import { QuizDto } from './QuizDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';

export class QuizsPageDto {
    @ApiModelProperty({
        type: QuizDto,
        isArray: true,
    })
    readonly data: QuizDto[];

    @ApiModelProperty()
    readonly meta: PageMetaDto;

    constructor(data: QuizDto[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}
