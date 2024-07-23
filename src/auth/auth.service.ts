import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { EmailService } from 'src/email/email.service';
import { Role } from 'src/utils/Types/enums';
import { JwtUtils } from './utils';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
    private jwt: JwtService,
    // private emailService: EmailService,
  ) {}

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  async signup(dto: SignupDto, file: Express.Multer.File) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingEmail) throw new ForbiddenException('Email already taken');

    const existingPseudo = await this.prisma.user.findMany({
      where: { pseudo: dto.pseudo },
      orderBy: {
        pseudo_id: 'desc',
      },
    });

    let pseudoId = 1;

    if (existingPseudo[0]?.pseudo_id) {
      pseudoId = existingPseudo[0].pseudo_id + 1;
    }

    const userRole = await this.prisma.role.findFirst({
      where: { role: Role.GUEST },
    });

    const hashedPassword = await argon.hash(dto.password);
    const activationToken = await argon.hash(`${new Date()} + ${dto.email}`);
    const newUser = await this.prisma.user.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password_hash: hashedPassword,
        role_id: userRole.id,
        pseudo: dto.pseudo,
        pseudo_id: pseudoId,
        avatar: file.filename,
        activate_token: activationToken.replaceAll('/', ''),
      },
    });

    // await this.emailService.sendUserConfirmation(newUser, activationToken);

    return `user registered, please validate with the link in the email sent to signin`;
  }

  async signin(dto: SigninDto) {
    const existingEmail = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.credential }, { pseudo: dto.credential }] },
    });

    if (!existingEmail) throw new ForbiddenException('invalid credentials');

    const isValidPassword = await argon.verify(
      existingEmail.password_hash,
      dto.password,
    );

    if (!isValidPassword) throw new ForbiddenException('invalid credentials');

    return this.signToken(existingEmail.id);
  }

  async validateAccount(token: string) {
    const exisingUser = await this.prisma.user.findFirst({
      where: {
        activate_token: token,
      },
    });

    if (!exisingUser) throw new NotFoundException('user does not exist');

    const userRole = await this.prisma.role.findUnique({
      where: { id: Role.CUSTOMER },
    });

    return this.prisma.user.update({
      where: { id: exisingUser.id },
      data: {
        activate_token: '',
        role_id: userRole.id,
      },
    });
  }
}
