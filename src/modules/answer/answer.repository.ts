import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { AnswerEntity } from './answer.entity';

@EntityRepository(AnswerEntity)
export class AnswerRepository extends Repository<AnswerEntity> {}
