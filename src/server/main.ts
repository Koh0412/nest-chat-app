import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./domains/app/app.module";
import * as nunjucks from "nunjucks";
import * as helmet from "helmet"
import { HttpExceptionFilter, InternalExceptionFilter } from "./filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ["error", "warn"]
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

  app.useGlobalFilters(new HttpExceptionFilter, new InternalExceptionFilter);

  const viewEnv = nunjucks.configure("views", nunjucksOptions);
  app.engine("njk", viewEnv.render);
  app.setViewEngine("njk");

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
