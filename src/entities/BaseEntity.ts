import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export interface IBaseEntity {
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id?:number;

  @Column()
  @CreateDateColumn()
  createdAt?: Date | string;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date  | string;
}
