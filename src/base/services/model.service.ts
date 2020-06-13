import { Injectable } from "@nestjs/common";
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
    return this.repository.insert(data);
  }

  /**
   * 全てのレコードを返す
   */
  async all(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * 指定したidのレコードを取得
   *
   * @param id
   */
  async findOne(id: number): Promise<T> {
    const model = this.repository.findOne({
      where: { id }
    });
    return model;
  }
}