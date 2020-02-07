import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { QuizEntity } from './quiz.entity';
import { QuizDto } from './dto/QuizDto';
import { QuizRepository } from './quiz.repository';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { QuizsPageOptionsDto } from './dto/quizs-page-options.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { QuizsPageDto } from './dto/quizs-page.dto';

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
        quizDto: QuizDto,
        // file: IFile,
    ): Promise<QuizEntity> {
        const quiz = this.quizRepository.create({ ...quizDto });
        return this.quizRepository.save(quiz);
    }

    async getQuizs(pageOptionsDto: QuizsPageOptionsDto): Promise<QuizsPageDto> {
        const queryBuilder = this.quizRepository.createQueryBuilder('quiz');
        const [quizs, quizsCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: quizsCount,
        });
        return new QuizsPageDto(quizs.toDtos(), pageMetaDto);
    }
}
