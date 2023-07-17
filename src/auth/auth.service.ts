import { ConflictException, Injectable } from '@nestjs/common';
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
    const user = await this.usersService.findOneByUsername(username);

    if (user && user.password === password) {
      const { password, username, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
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
        'Password does not contain a number or a special character',
      );
    user.salt = randomBytes(16).toString('hex');
    user.password = this.saltAndHash(user.password, user.salt);
    const insertRntity = { ...user };
    const createResult = await this.usersService.create(insertRntity);
    const { password, salt, ...result } = createResult;
    return this.login(result);
  }
}
