import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInValidator } from './dto/auth-signin.dto';
import { User } from 'src/users/entities/user.entity';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      const saltedPassword = this.saltAndHash(password, user.salt);
      if (user && user.password === saltedPassword) {
        const { password, username, ...result } = user;
        return result;
      }
    } catch (err) {
      throw new NotFoundException('User not found.');
    }
  }

  async logIn(user: any) {
    const payload = {
      username: user.username,
      userId: user.id,
    };
    return {
      message: 'success',
      statusCode: 200,
      access_token: this.jwtService.sign(payload),
    };
  }

  validatePassword(password: string): boolean {
    const re =
      /^(?=.*[0-9])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z0-9 `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{6,32}$/;
    return re.test(password);
  }
  saltPassword(password: string, salt: string): string {
    let passwordToAscii = 0;
    const passwordWithSalt = password.split('');
    passwordWithSalt.map((letter) => (passwordToAscii += letter.charCodeAt(0)));
    passwordWithSalt.splice(passwordToAscii % (password.length + 1), 0, salt);

    return passwordWithSalt.join('');
  }
  saltAndHash(password: string, salt: string): string {
    const saltedPassword = this.saltPassword(password, salt);
    return createHash('sha256').update(saltedPassword).digest('hex');
  }

  async signIn(body: SignInValidator) {
    const user: User = {
      name: body.name,
      username: body.username,
      password: body.password,
      salt: null,
    }; //TOOD: secure against data injection in body
    if (!this.validatePassword(user.password))
      throw new ConflictException(
        'Password must contain: letter, number and a special character.',
      );
    if (await this.usersService.findOneByUsername(user.username))
      throw new ConflictException(
        'This username is already in use. Please choose another one.',
      );
    user.salt = randomBytes(16).toString('hex');
    user.password = this.saltAndHash(user.password, user.salt);
    const insertRntity = { ...user };
    const createResult = await this.usersService.create(insertRntity);
    const { password, salt, ...result } = createResult;
    return this.logIn(result);
  }
}
