import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { QuestionDto } from './dto/QuestionDto';
import { UserEntity } from '../user/user.entity';
import { QuizEntity } from '../quiz/quiz.entity';
import { AnswerEntity } from '../answer/answer.entity';

@Entity({ name: 'questions' })
@Index(['text', 'quiz'], { unique: true })
export class QuestionEntity extends AbstractEntity<QuestionDto> {
    @Column({ nullable: false })
    text: string;
    @Column({ nullable: false, default: false })
    ispublished: boolean;

    @ManyToOne(
        type => QuizEntity,
        quiz => quiz.questions,
    )
    quiz: QuizEntity;
    @OneToMany(
        type => AnswerEntity,
        answer => answer.question,
    )
    answers: AnswerEntity[];

    dtoClass = QuestionDto;
}
