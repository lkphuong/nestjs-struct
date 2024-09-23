import { ROLES_KEY } from '@constants/index';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: any) => SetMetadata(ROLES_KEY, roles);
