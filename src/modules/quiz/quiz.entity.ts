import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Index,
} from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { QuizDto } from './dto/QuizDto';
import { UserEntity } from '../user/user.entity';
import { QuestionEntity } from '../question/question.entity';
import { RoleType } from '../../common/constants/role-type';

export interface quizAuth {
    role: RoleType;
}
@Entity({ name: 'quizes' })
@Index(['title', 'author'], { unique: true })
export class QuizEntity extends AbstractEntity<QuizDto> {
    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false, default: false })
    ispublished: boolean;

    @ManyToOne(
        type => UserEntity,
        user => user.quizes,
    )
    author: UserEntity;

    @OneToMany(
        type => QuestionEntity,
        question => question.quiz,
    )
    questions: Array<QuestionEntity>;

    role: RoleType;
    dtoClass = QuizDto;
    toDto() {
        return super.toDto();
    }
}
