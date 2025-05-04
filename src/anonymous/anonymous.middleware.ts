import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AnonymousMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.anonymous || req.headers['anonymous'];

    if (token && await this.authService.verifyToken(token)) {
      req['anonymous'] = token;
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