import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler'
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class FiboThrottle extends ThrottlerGuard {
    async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
        // const client = context.switchToWs().getClient();
        // // this is a generic method to switch between `ws` and `socket.io`. You can choose what is appropriate for you
        // const ip = ['conn', '_socket']
        //     .map((key) => client[key])
        //     .filter((obj) => obj)
        //     .shift().remoteAddress;
        const key = FiboThrottle.name;
        const ttls = await this.storageService.getRecord(key);

        console.log(ttls)

        if (ttls.length >= limit) {
            throw new ThrottlerException();
        }

        await this.storageService.addRecord(key, ttl);
        return true;
    }
}