import { HttpException, HttpStatus } from "@nestjs/common";

export class TimeOver extends HttpException {
  constructor() {
    super('인증번호 유효시간이 지났습니다', HttpStatus.BAD_REQUEST);
  }
}