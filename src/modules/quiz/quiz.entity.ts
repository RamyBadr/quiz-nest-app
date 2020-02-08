import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { QuizDto } from './dto/QuizDto';

@Entity({ name: 'quizes' })
export class QuizEntity extends AbstractEntity<QuizDto> {
    @Column({ nullable: false })
    title: string;
    @Column({ nullable: false })
    ispublished: boolean;
    @Column({ nullable: false })
    authorId: string;

    dtoClass = QuizDto;
}
