import { IS_PUBLIC_KEY, ROLES_KEY } from '@constants/index';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: any) => SetMetadata(ROLES_KEY, roles);

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
