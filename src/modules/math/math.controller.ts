import { Controller, Get } from '@nestjs/common';
import {
    ClientProxy,
    Client,
    Transport,
    MessagePattern,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('')
export class MathController {
    @Client({ transport: Transport.TCP, options: { port: 4000 } })
    client: ClientProxy;

    @Get('')
    call(): Observable<string> {
        const pattern = { cmd: 'hello' };
        const data = [1, 2, 3, 4, 5];
        return this.client.send<string>(pattern, data);
    }

    @MessagePattern({ cmd: 'hello' })
    hello(): string {
        return 'hello world';
    }

    // sum(data: number[]): number {
    //     return (data || []).reduce((a, b) => a + b);
    // }
}
