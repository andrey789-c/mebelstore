import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnonymousMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.anonymous || req.headers['anonymous'];

    if (token && (await this.authService.verifyToken(token))) {
      req['anonymous'] = token;

      const {anonymousId} = await this.authService.verifyToken(token);

      await this.prisma.cart.upsert({
        create: {
          anonymousId,
        },
        update: {},
        where: { anonymousId },
      });

      await this.prisma.favorite.upsert({
        create: {
          anonymousId,
        },
        update: {},
        where: { anonymousId },
      });

      return next();
    }

    const newToken = await this.authService.generateAnonymousToken();
    req['anonymous'] = newToken.access_token;

    res.cookie('anonymous', newToken.access_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    next();
  }
}
