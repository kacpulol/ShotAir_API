import {Body,Controller,Get,Post,Request,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignInValidator } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: SignInValidator) {
    return this.authService.signIn(body);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req ):any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string{
    return req.user;
  }

}
