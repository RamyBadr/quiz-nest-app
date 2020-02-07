import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { AuthModule } from '../auth/auth.module';
import { QuizRepository } from './quiz.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([QuizRepository]),
    ],
    controllers: [QuizController],
    exports: [QuizService],
    providers: [QuizService],
})
export class QuizModule {}
