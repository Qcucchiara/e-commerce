import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { jwtUtils } from './utils';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: jwtUtils,
    private emailService: EmailService,
  ) {}

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

    if (existingPseudo[0]?.pseudo_id)
      pseudoId = existingPseudo[0].pseudo_id + 1;

    const hashedPassword = await argon.hash(dto.password);
    const activationToken = await argon.hash(`${new Date()} + ${dto.email}`);

    const newUser = await this.prisma.user.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        password_hash: hashedPassword,
        pseudo: dto.pseudo,
        pseudo_id: pseudoId,
        avatar: file.filename,
        activate_token: activationToken.replaceAll('/', ''),
      },
    });

    await this.emailService.sendUserConfirmation(newUser, activationToken);

    return `user registered, please validate with the link in the email sent to signin`;
  }

  async signin(dto: SigninDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.credential },
    });

    if (!existingEmail) throw new ForbiddenException('invalid credentials');

    const isValidPassword = await argon.verify(
      existingEmail.password_hash,
      dto.password,
    );

    if (!isValidPassword) throw new ForbiddenException('invalid credentials');

    return this.jwt.signToken(existingEmail.id);
  }

  async validateAccount(token) {
    const exisingUser = await this.prisma.user.findFirst({
      where: {
        activate_token: token,
      },
    });

    if (!exisingUser) throw new NotFoundException('user does not exist');

    return this.prisma.user.update({
      where: { id: exisingUser.id },
      data: {
        activate_token: '',
        role: 'customer',
      },
    });
  }
}
