import { CompanyUnit } from '@app/entities/CompanyUnit';
import getDbClient from '@app/config';

import { defineEndpoints } from '@app/utils/rest-client';
import { getError } from '@app/utils/_helpers';
import { companyDetailSchema, companyUnitSchema, errorSchema, statusSchema } from '@app/entities/_schemas';

export default defineEndpoints({
  GET: {
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: companyDetailSchema
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ res, req }) => {
      try{
        const result = await (await getDbClient()).getRepository(CompanyUnit).findOne({ where: {
            id: parseInt(req.query.id as string)
          }, relations: {
            parent: true
          } })
        res.status(200).json(result)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }

    }
  },
  DELETE: {
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: statusSchema
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ res, req }) => {
      try{
        (await getDbClient()).getRepository(CompanyUnit).delete({
          id: parseInt(req.query.id as string)
        })
        res.status(200).json({ status: "success" })
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }

    }
  },
  PATCH: {
    input: {
      contentType: 'application/json',
      body: companyUnitSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: statusSchema
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ res, req }) => {
      try{
        await (await getDbClient()).getRepository(CompanyUnit).update({
          id: parseInt(req.query.id as string)
        }, req.body as CompanyUnit)
        res.status(200).json({ status: "success" })
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }

    }
  }
});
