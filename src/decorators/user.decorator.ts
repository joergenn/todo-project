import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => context.switchToHttp().getRequest().user);
