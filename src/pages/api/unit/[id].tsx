import { Unit } from '@app/entities/Unit';
import { defineEndpoints } from '@app/utils/rest-client';
import getDbClient from '@app/config';
import { getError } from '@app/utils/_helpers';
import { errorSchema, statusSchema, unitSchema } from '@app/entities/_schemas';

export default defineEndpoints({
  GET: {
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
      try{
        const result = await (await getDbClient()).getRepository(Unit).findOne({ where: {
            id: parseInt(req.query.id as string)
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
        await (await getDbClient()).getRepository(Unit).delete({
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
      body: unitSchema,
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
        (await getDbClient()).getRepository(Unit).update({
          id: parseInt(req.query.id as string)
        }, req.body)
        res.status(200).json({ status: "success" })
      } catch (e: unknown) {
        res.setHeader('content-type', 'application/json');
        res.status(500).json({ error: getError(e) })
      }

    }
  }
});
