import { parseArgs } from 'node:util';
import { db } from '../src/utils/db';
import { logger } from './utils/logger';
import { getPermissionValues, getValidPermissions } from './utils/permissions';

updatePermissions();

async function updatePermissions() {
  const { values: { key, add, remove, help, reason } } = parseArgs({
    strict: true,
    options: {
      help: {
        type: 'boolean',
        default: false,
      },
      key: {
        type: 'string',
      },
      add: {
        type: 'string',
        multiple: true,
        short: 'a',
      },
      remove: {
        type: 'string',
        multiple: true,
        short: 'r',
      },
      reason: {
        type: 'string'
      }
    }
  });

  const validPermissions = await getValidPermissions();

  if (help) {
    printHelp(validPermissions);
    process.exit(0);
  }

  if (!key) {
    logger.error('Missing --key argument');
    process.exit(1);
  }

  const consumer = await db.consumer.findUnique({ where: { key }, include: { permissions: true } });

  if (!consumer) {
    logger.error('Consumer not found');
    process.exit(1);
  }

  if (consumer.status !== 'valid') {
    logger.warn(`Consumer status is not valid. Current status: ${consumer.status}`);
  }

  const addPermissions = getPermissionValues(add ?? [], validPermissions);
  const removePermissions = getPermissionValues(remove ?? [], validPermissions, false);
  const permissionUpdates = {
    ...addPermissions,
    ...removePermissions,
  };

  await db.consumerPermissions.update({
    where: { id: consumer.permissions.id },
    data: {
      ...consumer.permissions,
      ...permissionUpdates,
    }
  });

  const addedPermissions = `[${Object.keys(addPermissions).join(', ')}]`;
  const removedPermissions = `[${Object.keys(removePermissions).join(', ')}]`;
  const formattedReason = reason ? `, Reason: ${reason}` : '';

  await db.consumerNote.create({
    data: {
      consumerId: consumer.id,
      note: `Updating permissions - Enabled: ${addedPermissions}, Disabled: ${removedPermissions}${formattedReason}`,
    }
  });

  logger.success('Consumer successfully updated');
}

function printHelp(validPermissions: string[]) {
  logger.underline('Use this script to update the permissions of an API consumer.');
  logger.log(' Arguments:');
  logger.log('   --key\t\tRequired\tAPI key of the consumer to update');
  logger.log('   --add | -a\t\tOptional\tPermission to add to the consumer (pass one for each permission you want to update)');
  logger.log('   --remove | -r\tOptional\tPermission to remove from the consumer (pass one for each permission you want to update)');
  logger.log('   --reason\t\tOptional\tCustom message to log with the update note'); 
  logger.log(`\n   Valid permissions:\t${validPermissions.join(', ')}`);
}
