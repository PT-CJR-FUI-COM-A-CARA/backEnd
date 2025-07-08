import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdminRoute'; 
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);