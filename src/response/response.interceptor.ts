import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === 500) {
      const errors = 'Unknown';
      response.status(statusCode).json({
        success: false,
        message: errors,
        errors: typeof errors === 'string' ? null : errors,
      });
    } else {
      const errors = (exception.getResponse() as any).message;
      response.status(statusCode).json({
        success: false,
        message: exception.message.replace(' Exception', ''),
        errors: typeof errors === 'string' ? null : errors,
      });
    }
  }

  responseHandler(res: any) {
    return {
      success: true,
      result: res,
    };
  }
}
