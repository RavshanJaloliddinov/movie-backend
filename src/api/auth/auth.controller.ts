import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, CreateOtpDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login with OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  async login(@Body() createOtpDto: CreateOtpDto) {
    return await this.authService.login(createOtpDto);
  }

  @Post('check-otp')
  @ApiOperation({ summary: 'Check OTP for login' })
  @ApiResponse({ status: 200, description: 'OTP is valid' })
  async checkOtp(@Body() checkOtpDto: CheckOtpDto, @Req() req) {
    return await this.authService.checkOtp(checkOtpDto, req);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully and OTP sent' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
