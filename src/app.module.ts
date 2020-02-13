import './boilerplate.polyfill';

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { MathModule } from './modules/math/math.module';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
    imports: [
        MathModule,
        AuthModule,
        UserModule,
        QuizModule,
        QuestionModule,
        AnswerModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
