import { parseArgs } from 'node:util';
import { v4 as uuid } from 'uuid';
import { db } from '../src/utils/db';
import { logger } from './logger';

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

  const permissions = permission?.reduce((output, perm) => {
    if (!validPermissions.includes(perm)) {
      logger.warn(`Unknown permission: ${perm}`);
      return output;
    }

    return {
      ...output,
      [perm]: true,
    };
  }, {});

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

  logger.log(`SUCCESS: Consumer created. API Key is: ${consumer.key}`);
}

async function getValidPermissions() {
  const permissionObject = await db.consumerPermissions.findFirst();
  return Object.keys(permissionObject).filter(key => 
    !['id', 'createdAt', 'updatedAt', 'consumerId'].includes(key));
}

function printHelp(validPermissions: string[]) {
  logger.underline('Use this script to create a new API consumer.');
  logger.log(' Arguments:');
  logger.log('   --name\t\tRequired\t\tname of the new API consumer');
  logger.log('   --permission | -p\tOptional arguments\tpermission to give to the new consumer (pass one for each permission)');
  logger.log(`   Valid permissions:\t${validPermissions.join(', ')}`);
}
