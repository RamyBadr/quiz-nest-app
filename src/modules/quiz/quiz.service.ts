import { Injectable, BadRequestException } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { QuizEntity } from './quiz.entity';
import { QuizDto } from './dto/QuizDto';
import { QuizRepository } from './quiz.repository';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { QuizsPageOptionsDto } from './dto/quizes-page-options.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { QuizsPageDto } from './dto/quizes-page.dto';
import { QuizCreateDto } from './dto/QuizCreateDto';
import { UserEntity } from '../user/user.entity';
import { QuizFilterDto, IQuizFilterDto } from './dto/QuizFilterDto';
import { RoleType } from '../../common/constants/role-type';
import { QuizIdParamsDto, QuizUpdateDto } from './dto/QuizUpdateDto';
import { UserFilterDto } from '../user/dto/UserFilterDto';
import { UserDto } from '../user/dto/UserDto';

@Injectable()
export class QuizService {
    constructor(
        public readonly quizRepository: QuizRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single quiz
     */
    findOne(findData: FindConditions<QuizEntity>): Promise<QuizEntity> {
        return this.quizRepository.findOne(findData);
    }

    async createQuiz(
        quizDto: QuizCreateDto,
        author: UserDto,
    ): Promise<QuizEntity> {
        const quiz = this.quizRepository.create({ ...quizDto, author });
        quiz.ispublished = false;
        return this.quizRepository.save(quiz);
    }
    async updateQuiz(
        quizDto: QuizUpdateDto,
        id: string,
        author: UserDto,
    ): Promise<any> {
        if (quizDto.ispublished == true) {
            const queryBuilder = this.quizRepository.createQueryBuilder('quiz');
            const [quizes, quizesCount] = await queryBuilder
                .innerJoinAndSelect(
                    'quiz.questions',
                    'question',
                    'question.ispublished=true',
                )
                .where({
                    id: id,
                })
                .skip(0)
                .take(1)
                .getManyAndCount();
            // const qDto = quizEntity.toDto();
            if (quizesCount == 0) {
                throw new BadRequestException({
                    message: 'error.quiz.puplish.questions.empty',
                });
            }
        }
        const quiz = await this.quizRepository.update(
            { id, author: author },
            quizDto,
        );
        return quiz;
    }
    async getOne(filter: IQuizFilterDto, role?: RoleType): Promise<QuizEntity> {
        // return this.quizRepository.findOne({...filter},{});
        const queryBuilder = this.quizRepository.createQueryBuilder('quiz');

        if (role == RoleType.User) {
            filter.ispublished = true;
            filter.question = {
                ispublished: true,
            };
            const quiz = await queryBuilder
                .select([
                    'quiz',
                    'user',
                    'question',
                    'answer.text',
                    'answer.id',
                ])
                .leftJoinAndSelect('quiz.author', 'user')
                .innerJoinAndSelect(
                    'quiz.questions',
                    'question',
                    `question.ispublished=true`,
                )
                .innerJoinAndSelect('question.answers', 'answer', '')
                .where({ ...filter })
                .skip(0)
                .take(1)
                .getOne();
            if (!quiz) {
                return;
            }
            for (let index = 0; index < quiz.questions.length; index++) {
                let question = quiz.questions[index];
                for (let j = 0; j < question.answers.length; j++) {
                    const answer = question.answers[j];
                    delete answer.iscorrect;
                }
            }
            return quiz;
        }
        if (role == RoleType.Teacher) {
            const quiz = await queryBuilder
                .select([
                    'quiz',
                    'user',
                    'question',
                    'answer.text',
                    'answer.id',
                ])
                .leftJoinAndSelect('quiz.author', 'user')
                .leftJoinAndSelect(
                    'quiz.questions',
                    'question',
                    filter.question && filter.question.ispublished
                        ? `question.ispublished=${filter.question.ispublished}`
                        : '',
                )
                .leftJoinAndSelect('question.answers', 'answer', '')
                // .addSelect('answer.text', 'answer.text')
                // .addSelect('answer.id', 'answer.id')
                .where({ ...filter })
                .skip(0)
                .take(1)
                .getOne();
            return quiz;
        }
        return;
    }

    async getQuizs(pageOptionsDto: QuizsPageOptionsDto): Promise<QuizsPageDto> {
        const filter = new QuizFilterDto(pageOptionsDto);
        console.log(filter, 'filter passed');

        const queryBuilder = this.quizRepository.createQueryBuilder('quiz');
        const [quizes, quizesCount] = await queryBuilder
            .leftJoinAndSelect('quiz.author', 'user')
            .where(filter)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: quizesCount,
        });
        return new QuizsPageDto(quizes.toDtos(), pageMetaDto);
    }
}
