import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { QuizEntity } from './quiz.entity';

@EntityRepository(QuizEntity)
export class QuizRepository extends Repository<QuizEntity> {}
