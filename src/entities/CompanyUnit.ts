import 'reflect-metadata';
import { BaseEntity } from './BaseEntity';
// import { Company, ICompany } from './Company';
// import { IUnit, Unit } from './Unit';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, Relation } from 'typeorm';
import { IUnit, Unit } from '@app/entities/Unit';
import { Company, ICompany } from '@app/entities/Company';

export interface ICompanyUnit extends BaseEntity {
  company?: ICompany | number;
  parent?: ICompanyUnit | number;
  unit?: IUnit | number;
  position?: string
}

@Entity()
export class CompanyUnit extends BaseEntity implements ICompanyUnit {
  @ManyToOne(() => Company, company => company.units, {
    eager: true,
    cascade: true
  })
  @JoinTable()
  company: Relation<Company>;

  @ManyToOne(() => CompanyUnit, companyUnit => companyUnit.children, {
    lazy: true
  })
  @JoinColumn({ name: "parentId" })
  parent: Relation<CompanyUnit>;

  @OneToMany(() => CompanyUnit, (companyUnit) => companyUnit.parent)
  children: Relation<CompanyUnit[]>

  //@Column()
  @OneToOne(() => Unit, {
    eager: true,
  })
  @JoinColumn()
  unit: Relation<Unit>;

  @Column()
  position: string
}
