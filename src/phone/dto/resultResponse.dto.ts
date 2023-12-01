import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class ResultResponseDto {

  @IsNotEmpty()
  result: boolean;


  constructor(result: boolean) {
    this.result = result;
}
}
