import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, BaseEntity, InsertResult } from "typeorm";

/**
 * serviceクラスの基底クラス
 */
@Injectable()
export class ModelService<T> {
  constructor(@InjectRepository(BaseEntity) private readonly repository: Repository<T>) {}

  /**
   * 与えられたデータをdb内に追加
   *
   * @param data
   */
  async create(data: T): Promise<InsertResult> {
    return this.repository.insert(data).catch(() => {
      throw new BadRequestException();
    });
  }

  /**
   * 全てのレコードを返す
   */
  async all(): Promise<T[] | undefined> {
    return this.repository.find();
  }

  /**
   * 指定したidのレコードを取得
   *
   * @param id
   */
  async findOne(id: number): Promise<T | undefined> {
    const model = this.repository.findOne({
      where: { id }
    });
    return model;
  }

  /**
   * 指定のカラム名で検索する
   *
   * @param params
   */
  async findByParams(params: any): Promise<T | undefined> {
    return this.repository.findOne({
      where: params
    });
  }
}