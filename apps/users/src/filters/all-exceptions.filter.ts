import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error('Exception caught:', {
      message: exception?.message,
      name: exception?.name,
      code: exception?.code,
      statusCode: exception?.statusCode,
    });

    // Handle database errors
    if (exception?.code === 'ER_NO_DB_ERROR') {
      const error = {
        status: 'error',
        message: 'Database does not exist. Please create the database first.',
        code: 'DB_NOT_FOUND',
      };
      return super.catch(new BadRequestException(error), host);
    }

    if (exception?.code === 'PROTOCOL_CONNECTION_LOST') {
      const error = {
        status: 'error',
        message: 'Database connection lost',
        code: 'DB_CONNECTION_LOST',
      };
      return super.catch(new BadRequestException(error), host);
    }

    if (exception?.code === 'ER_ACCESS_DENIED_ERROR') {
      const error = {
        status: 'error',
        message: 'Database access denied. Check credentials.',
        code: 'DB_AUTH_ERROR',
      };
      return super.catch(new BadRequestException(error), host);
    }

    // Default error handling
    return super.catch(exception, host);
  }
}
