/** 全体で使うdecoratorの定義ファイル */
import { SetMetadata, Render } from '@nestjs/common';

/**
 * - 指定されたテンプレートを返す, 階層はドットを使用する
 * @param template
 * @publicApi
 */
export function View(template: string): MethodDecorator {
  const replaceTemplate = template.replace(/\./g, "/");
  SetMetadata('view', replaceTemplate);
  return Render(replaceTemplate);
};
