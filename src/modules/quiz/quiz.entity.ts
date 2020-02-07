import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { QuizDto } from './dto/QuizDto';

@Entity({ name: 'quizs' })
export class QuizEntity extends AbstractEntity<QuizDto> {
    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    ispublished: boolean;
    dtoClass = QuizDto;
}
