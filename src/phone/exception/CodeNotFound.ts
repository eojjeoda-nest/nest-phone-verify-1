import { HttpException, HttpStatus } from "@nestjs/common";

export class CodeNotFound extends HttpException {
  constructor() {
    super('인증번호가 맞지 않습니다', HttpStatus.BAD_REQUEST);
  }
}