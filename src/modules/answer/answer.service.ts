import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnswerDto } from './dto/AnswerDto';
import { AnswerRepository } from './answer.repository';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { AnswersPageOptionsDto } from './dto/answers-page-options.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { AnswersPageDto } from './dto/answers-page.dto';
import { AnswerCreateDto } from './dto/AnswerCreateDto';
import { UserEntity } from '../user/user.entity';
import { AnswerFilterDto } from './dto/AnswerFilterDto';
import { RoleType } from '../../common/constants/role-type';
import { AnswerUpdateParamsDto, AnswerUpdateDto } from './dto/AnswerUpdateDto';
import { UserFilterDto } from '../user/dto/UserFilterDto';
import { QuestionEntity } from '../question/question.entity';

@Injectable()
export class AnswerService {
    constructor(
        public readonly answerRepository: AnswerRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single answer
     */
    findOne(findData: FindConditions<AnswerEntity>): Promise<AnswerEntity> {
        return this.answerRepository.findOne(findData);
    }

    //   async createQuestion(
    //     questionDto: QuestionCreateDto,
    //     author: UserDto,
    // ): Promise<QuestionEntity> {
    //     const question = this.questionRepository.create({ ...questionDto, author });
    //     question.iscorrect = false;
    //     return this.questionRepository.save(question);
    // }
    async createAnswer(
        answerDto: AnswerCreateDto,
        question: QuestionEntity,
    ): Promise<AnswerEntity> {
        const answer = this.answerRepository.create({
            ...answerDto,
            question,
        });
        return this.answerRepository.save(answer);
    }
    async updateAnswer(answerDto: AnswerUpdateDto, id: string): Promise<any> {
        const answer = await this.answerRepository.update({ id }, answerDto);
        return answer;
    }

    async getAnswers(
        pageOptionsDto: AnswersPageOptionsDto,
    ): Promise<AnswersPageDto> {
        const filter = new AnswerFilterDto(pageOptionsDto);
        const queryBuilder = this.answerRepository.createQueryBuilder('answer');
        const [answers, answersCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .where(filter)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: answersCount,
        });
        return new AnswersPageDto(answers.toDtos(), pageMetaDto);
    }
}
