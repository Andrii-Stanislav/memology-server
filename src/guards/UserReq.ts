import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserReq = createParamDecorator(
  (property: string, ectx: ExecutionContext) => {
    const ctx = ectx.getArgByIndex(1);
    return property ? ctx.req.user && ctx.req.user[property] : ctx.req.user;
  },
);
