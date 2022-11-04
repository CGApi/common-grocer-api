import { db } from '../../src/utils/db';
import { logger } from './logger';

export async function getValidPermissions() {
  const permissionObject = await db.consumerPermissions.findFirst();
  return Object.keys(permissionObject).filter(key => 
    !['id', 'createdAt', 'updatedAt', 'consumerId'].includes(key));
}

export function getPermissionValues(permissions: string[], validPermissions: string[], value = true) {
  return permissions.reduce((output, perm) => {
    if (!validPermissions.includes(perm)) {
      logger.warn(`Unknown permission: ${perm}`);
      return output;
    }

    return {
      ...output,
      [perm]: value,
    };
  }, {});
}
