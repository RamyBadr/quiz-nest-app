import { Injectable, BadRequestException } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { QuestionDto } from './dto/QuestionDto';
import { QuestionRepository } from './question.repository';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { QuestionsPageOptionsDto } from './dto/questions-page-options.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { QuestionsPageDto } from './dto/questions-page.dto';
import { QuestionCreateDto } from './dto/QuestionCreateDto';
import { UserEntity } from '../user/user.entity';
import { QuestionFilterDto } from './dto/QuestionFilterDto';
import { RoleType } from '../../common/constants/role-type';
import {
    QuestionUpdateParamsDto,
    QuestionUpdateDto,
} from './dto/QuestionUpdateDto';
import { UserFilterDto } from '../user/dto/UserFilterDto';
import { QuizEntity } from '../quiz/quiz.entity';

@Injectable()
export class QuestionService {
    constructor(
        public readonly questionRepository: QuestionRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single question
     */
    findOne(findData: FindConditions<QuestionEntity>): Promise<QuestionEntity> {
        return this.questionRepository.findOne(findData);
    }

    //   async createQuiz(
    //     quizDto: QuizCreateDto,
    //     author: UserDto,
    // ): Promise<QuizEntity> {
    //     const quiz = this.quizRepository.create({ ...quizDto, author });
    //     quiz.ispublished = false;
    //     return this.quizRepository.save(quiz);
    // }
    async createQuestion(
        questionDto: QuestionCreateDto,
        quiz: QuizEntity,
    ): Promise<QuestionEntity> {
        const question = this.questionRepository.create({
            ...questionDto,
            quiz,
        });
        question.ispublished = false;
        return this.questionRepository.save(question);
    }
    async updateQuestion(
        questionDto: QuestionUpdateDto,
        id: string,
    ): Promise<any> {
        const queryBuilder = this.questionRepository.createQueryBuilder(
            'question',
        );
        if (questionDto.ispublished == true) {
            const questionEntity = await this.questionRepository.findOne(id, {
                relations: ['answers'],
            });
            const qDto = questionEntity.toDto();
            if (!qDto.answers || qDto.answers.length == 0) {
                throw new BadRequestException({
                    message: 'error.question.puplish.answers.empty',
                });
            }
        }

        const result = await queryBuilder
            .update()
            .set({ ...questionDto })
            .where('id = :id', { id: id })
            .execute();

        return result;
    }

    async getQuestions(
        pageOptionsDto: QuestionsPageOptionsDto,
    ): Promise<QuestionsPageDto> {
        const filter = new QuestionFilterDto(pageOptionsDto);
        const queryBuilder = this.questionRepository.createQueryBuilder(
            'question',
        );
        const [questions, questionsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .where(filter)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: questionsCount,
        });
        return new QuestionsPageDto(questions.toDtos(), pageMetaDto);
    }
}
