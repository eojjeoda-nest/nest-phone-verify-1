import { HttpException } from '@nestjs/common';

export class ErrorResponse {
  public status: number;
  public code: string;
  public message: string;

  constructor(exception: HttpException) {
    this.status = exception.getStatus();
    this.code = exception.getResponse()['error'];
    this.message = exception.getResponse()['message'];
  }

  toJson() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
    };
  }
}
