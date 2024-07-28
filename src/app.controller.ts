import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
// 
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import bootstrap from './angular-frontend/src/main.server';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

@Controller()
export class AppController {
  commonEngine = new CommonEngine();

  constructor(private readonly appService: AppService) {}

  @Get('')
  frontend(@Req() req: Request): any {
    const serverDistFolder = dirname(fileURLToPath('./angular-frontend/dist/angular-frontend/server'));
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(serverDistFolder, 'index.server.html');

    const { protocol, originalUrl, baseUrl, headers } = req;
  
    this.commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    });
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
