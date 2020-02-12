import { Observable } from 'rxjs';
import {
    ExecutionContext,
    Injectable,
    NestInterceptor,
    CallHandler,
} from '@nestjs/common';

import { UserEntity } from '../modules/user/user.entity';
import { AuthService } from '../modules/auth/auth.service';
import { BaseEntity } from 'typeorm';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const query = <BaseEntity>request.query;
        // AuthService.setAuthUser(user);
        console.log(query);
        return next.handle();
    }
}
