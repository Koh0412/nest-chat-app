import { join } from "path";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import * as session from 'express-session';
import * as nunjucks from "nunjucks";
import * as helmet from "helmet";
import * as passport from "passport";
import flash = require('connect-flash');

import { AppModule } from "./domains/app/app.module";
import { HttpExceptionFilter, InternalExceptionFilter } from "./common/filters";
import { SESSION_KEY } from "./common/constants/const";

/**
 * 起動設定
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn"]
  });

  const nunjucksOptions: nunjucks.ConfigureOptions = {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: process.env.NODE_ENV === "local" ? true : false,
    express: app
  };

  app.use(helmet());
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter, new InternalExceptionFilter);

  const viewEnv = nunjucks.configure("views", nunjucksOptions);
  app.engine("njk", viewEnv.render);
  app.setViewEngine("njk");

  app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
