"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const quiz_repository_1 = require("./quiz.repository");
const validator_service_1 = require("../../shared/services/validator.service");
const aws_s3_service_1 = require("../../shared/services/aws-s3.service");
const PageMetaDto_1 = require("../../common/dto/PageMetaDto");
const quizs_page_dto_1 = require("./dto/quizs-page.dto");
let QuizService = class QuizService {
    constructor(quizRepository, validatorService, awsS3Service) {
        this.quizRepository = quizRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
    }
    findOne(findData) {
        return this.quizRepository.findOne(findData);
    }
    createQuiz(quizDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = this.quizRepository.create(Object.assign({}, quizDto));
            return this.quizRepository.save(quiz);
        });
    }
    getQuizs(pageOptionsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.quizRepository.createQueryBuilder('quiz');
            const [quizs, quizsCount] = yield queryBuilder
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take)
                .getManyAndCount();
            const pageMetaDto = new PageMetaDto_1.PageMetaDto({
                pageOptionsDto,
                itemCount: quizsCount,
            });
            return new quizs_page_dto_1.QuizsPageDto(quizs.toDtos(), pageMetaDto);
        });
    }
};
QuizService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [quiz_repository_1.QuizRepository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map