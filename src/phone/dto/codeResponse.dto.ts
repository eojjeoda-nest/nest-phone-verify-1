import { IsNotEmpty, IsString } from 'class-validator';

export class CodeResponseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  constructor(code: string) {
    this.code = code;

}

}
