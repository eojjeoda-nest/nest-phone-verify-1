import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthCodesService } from './auth-codes.service';

@Controller('auth-codes')
export class AuthCodesController {
  constructor(private readonly authCodesService: AuthCodesService) {}

}
