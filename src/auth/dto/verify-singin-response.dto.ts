import { IsBoolean } from 'class-validator';

export class VerifySinginResponseDto {
  @IsBoolean()
  result: boolean;
}
