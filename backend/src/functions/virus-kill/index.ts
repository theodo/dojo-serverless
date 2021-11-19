import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'virus/{id}',
        cors: true,
        request: {
          parameters: {
            paths: {
              id: true
            }
          }
        }
      }
    }
  ]
}