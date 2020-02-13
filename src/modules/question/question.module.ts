import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { AuthModule } from '../auth/auth.module';
import { QuestionRepository } from './question.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([QuestionRepository]),
    ],
    controllers: [QuestionController],
    exports: [QuestionService],
    providers: [QuestionService],
})
export class QuestionModule {}
