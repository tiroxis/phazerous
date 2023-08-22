import { z } from 'zod';
import { IUnit } from '@app/entities/Unit';
import { ICompanyUnit } from '@app/entities/CompanyUnit';
import { ICompany } from '@app/entities/Company';

export const baseEnititySchemaObj = {
  id:z.number(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
}

export const errorSchema = z.object({
  error: z.object({
    message: z.string()
  })
})

export const statusSchema = z.object({
  status: z.string()
})

export const companySchemaObj = {
  title: z.string(),
  description: z.string(),
  ...baseEnititySchemaObj
}

export const paginationSchema = z.object({
  _start: z.string().optional(),
  _end: z.string().optional()
})

export const unitSchema: z.ZodSchema<Partial<IUnit>> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  ...baseEnititySchemaObj
}).deepPartial()

export const companyUnitSchema: z.ZodSchema<Partial<ICompanyUnit>> = z.object({
  company: z.lazy(() => companyDetailSchema.or(z.number())),
  parent: z.lazy(() => companyUnitSchema.or(z.number())),
  children: z.lazy(() => companyUnitSchema.array()),
  unit: unitSchema.or(z.number()),
  position: z.string(),
  ...baseEnititySchemaObj
}).deepPartial()

export const companySchema: z.ZodSchema<Omit<ICompany, 'units'>> = z.object(companySchemaObj);

export const companyDetailSchema: z.ZodSchema<Partial<ICompany>> = z.object(companySchemaObj).extend({
  units: companyUnitSchema.array(),
}).deepPartial();
