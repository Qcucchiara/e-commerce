import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class jwtUtils {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
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
}
