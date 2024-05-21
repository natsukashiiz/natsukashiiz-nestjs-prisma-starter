import { Controller, Sse } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { interval, map, Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('/v1/server-sent-events')
export class ServerSentEventsController {
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => {
        const id = randomUUID();
        console.log(id);
        return {
          data: {
            id,
            time: new Date().toISOString(),
          },
        };
      }),
    );
  }
}
