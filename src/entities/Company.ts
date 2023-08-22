import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';
import { CompanyUnit, ICompanyUnit } from './CompanyUnit';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

export interface ICompany extends BaseEntity{
  title?: string;
  description?: string;
  units?: ICompanyUnit[]
}


@Entity()
export class Company extends BaseEntity implements ICompany {

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => CompanyUnit, unit => unit.company,{
    lazy: true,
    nullable: true
  })
  units: Relation<CompanyUnit[]>
}
