import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AuthModule } from '../auth/auth.module';
import { AnswerRepository } from './answer.repository';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([AnswerRepository]),
    ],
    controllers: [AnswerController],
    exports: [AnswerService],
    providers: [AnswerService],
})
export class AnswerModule {}
