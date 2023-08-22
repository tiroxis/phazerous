import { Unit } from '@app/entities/Unit';
import getDbClient from '@app/config';
import { defineEndpoints } from '@app/utils/rest-client';
import { getError } from '@app/utils/_helpers';
import { errorSchema, paginationSchema, unitSchema } from '@app/entities/_schemas';

export default defineEndpoints({
  GET: {
    input: {
      query: paginationSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: unitSchema.array()
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ req, res }) => {

      try{
        const repository = (await getDbClient()).getRepository(Unit);

        const result = await repository.find({
          skip: parseInt(<string>req.query._start) || 0,
          take: parseInt(<string>req.query._end) - parseInt(<string>req.query._start) || 10
        })
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
      body: unitSchema,
    },
    output: [
      {
        status: 200,
        contentType: 'application/json',
        schema: unitSchema
      },
      {
        status: 500,
        contentType: 'application/json',
        schema: errorSchema
      }
    ],
    handler: async ({ res, req }) => {
      try {
        const repository = (await getDbClient()).getRepository(Unit);
        const entity = await repository.create(req.body as Unit);
        await repository.save(entity)
        res.status(200).json(entity)
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }
    }
  },

});
