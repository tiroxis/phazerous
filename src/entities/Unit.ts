import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';
import { Column, Entity } from 'typeorm';

export interface IUnit extends BaseEntity {
  first_name?: string;
  last_name?: string;
  patronymic?: string;
  // company_unit: ICompanyUnit;
}


@Entity()
export class Unit extends BaseEntity implements IUnit{

  @Column()
  first_name?: string;

  @Column()
  last_name?: string;

  @Column()
  patronymic?: string;

  // @ManyToOne(() => CompanyUnit, { eager: true })
  //company_unit: CompanyUnit;
}
