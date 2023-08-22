import { CompanyUnit } from '@app/entities/CompanyUnit';
import getDbClient from '@app/config';
import { defineEndpoints } from '@app/utils/rest-client';
import {
  companyUnitSchema,
  errorSchema,
  paginationSchema,
} from '@app/entities/_schemas';
import { getError } from '@app/utils/_helpers';

export default defineEndpoints({
  GET: {
    input: {
      query: paginationSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: companyUnitSchema.array()
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ req, res }) => {

      try{
        const repository = (await getDbClient()).getRepository(CompanyUnit);

        const result = await repository.find({
          skip: parseInt(<string>req.query._start) || 0,
          take: parseInt(<string>req.query._end) - parseInt(<string>req.query._start) || 10,
          relations: {
            parent: true
          }
        })
        const total = await repository.count()

        res.setHeader('content-type', 'application/json');
        res.setHeader("x-total-count", total)
        res.status(200).json(result)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }
    }
  },
  POST: {
    input: {
      contentType: 'application/json',
      body: companyUnitSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: companyUnitSchema
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ res, req }) => {
      try {
        const repository = (await getDbClient()).getRepository(CompanyUnit);

        const entity = await repository.create(req.body as CompanyUnit);
        await repository.save(entity)
        res.status(200).json(entity)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }
    }
  },

});
