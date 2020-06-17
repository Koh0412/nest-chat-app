/** 全体で使うdecoratorの定義ファイル */
import { SetMetadata, Render, Redirect, Get, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthenticateGuard } from "../../handlers/guards/authenticate.guard";

/**
 * - 指定されたテンプレートを返す, 階層はドットを使用する
 * @param template
 * @publicApi
 */
export function View(template: string): MethodDecorator {
  const replaceTemplate = template.replace(/\./g, "/");
  SetMetadata("view", replaceTemplate);
  return Render(replaceTemplate);
};

/**
 * rootにリダイレクトする
 */
export function RedirectRoot(): MethodDecorator {
  return Redirect("/");
}

/**
 * 認証が必要なGETリクエスト
 *
 * @param path
 */
export function AuthGet(path?: string | string[]): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthenticateGuard),
    Get(path)
  )
}
