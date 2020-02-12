import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { AnswerDto } from './dto/AnswerDto';
import { QuestionEntity } from '../question/question.entity';

@Entity({ name: 'answers' })
@Index(['question', 'iscorrect'], { unique: true, where: 'iscorrect=true' })
@Index(['question', 'text'], { unique: true })
export class AnswerEntity extends AbstractEntity<AnswerDto> {
    @Column({ nullable: false })
    text: string;
    @Column({ nullable: false, default: false })
    iscorrect: boolean;

    @ManyToOne(
        type => QuestionEntity,
        question => question.answers,
    )
    question: QuestionEntity;

    dtoClass = AnswerDto;
}
