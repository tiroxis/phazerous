import { defineEndpoints } from '@app/utils/rest-client';
import { Company } from '@app/entities/Company';
import { getError } from '@app/utils/_helpers';
import getDbClient from '@app/config';
import { companyDetailSchema, companySchema, errorSchema, paginationSchema } from '@app/entities/_schemas';

export default defineEndpoints({
  GET: {
    input: {
      query: paginationSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: companySchema.array()
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ req, res }) => {

      try{
        const repository = (await getDbClient()).getRepository(Company);

        const result = await repository.find({
          skip: parseInt(<string>req.query._start) || 0,
          take: parseInt(<string>req.query._end) - parseInt(<string>req.query._start) || 10
        }) as Omit<Company, "units">[]
        const total = await repository.count()

        res.setHeader("x-total-count", total)
        res.setHeader('content-type', 'application/json');

        res.status(200).json(result)//result)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }
    }
  },
  POST: {
    input: {
      contentType: 'application/json',
      body: companyDetailSchema,
    },
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
      try {
        const repository = (await getDbClient()).getRepository(Company);

        const entity = await repository.create(req.body as Company);
        await repository.save(entity)
        res.status(200).json(entity)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }
    }
  },

});
