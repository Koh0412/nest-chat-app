import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column("integer")
  age: number;

  @Column({ unique: true })
  email: string;
}