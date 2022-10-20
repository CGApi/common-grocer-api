import { parseArgs } from 'node:util';
import { v4 as uuid } from 'uuid';
import { db } from '../src/utils/db';
import { logger } from './utils/logger';
import { getPermissionValues, getValidPermissions } from './utils/permissions';

generateConsumer();

async function generateConsumer() {
  const { values: { name, permission, help } } = parseArgs({
    strict: true,
    options: {
      help: {
        type: 'boolean',
        default: false,
      },
      name: {
        type: 'string',
      },
      permission: {
        type: 'string',
        multiple: true,
        short: 'p'
      }
    }
  });

  const validPermissions = await getValidPermissions();

  if (help) {
    printHelp(validPermissions);
    process.exit(0);
  }

  if (!name) {
    logger.error('Missing --name argument');
    process.exit(1);
  }

  const permissions = getPermissionValues(permission, validPermissions);

  const consumer = await db.consumer.create({
    data: {
      name,
      key: uuid(),
      permissions: {
        create: {
          ...permissions
        }
      }
    }
  });

  logger.success(`Consumer created. API Key is: ${consumer.key}`);
}

function printHelp(validPermissions: string[]) {
  logger.underline('Use this script to create a new API consumer.');
  logger.log(' Arguments:');
  logger.log('   --name\t\tRequired\tName of the new API consumer');
  logger.log('   --permission | -p\tOptional\tPermission to give to the new consumer (pass one for each permission you want enabled)');
  logger.log(`\n   Valid permissions:\t${validPermissions.join(', ')}`);
}
