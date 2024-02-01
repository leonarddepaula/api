import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.jwtService.sign()
  }

  async checkToken(token: string) {
    //return this.jwtService.verify()
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    return user;
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('E-mail Inválido');
    }

    //TO DO: Enviar o e-mail

    return true;
  }
  async reset(password: string, token: string) {
    //TO DO: validar o token...
    const id = 0;

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}
