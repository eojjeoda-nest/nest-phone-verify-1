import { HttpException, HttpStatus } from "@nestjs/common";

export class TitleNullException extends HttpException {
  constructor() {
    super('전화번호를 입력해주세요', HttpStatus.BAD_REQUEST);
  }
}