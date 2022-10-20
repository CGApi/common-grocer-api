import { parseArgs } from 'node:util';
import { db } from '../src/utils/db';
import { logger } from './utils/logger';

addNote();

async function addNote() {
  const { values: { key, reason, help } } = parseArgs({
    strict: true,
    options: {
      help: {
        type: 'boolean',
        default: false,
      },
      key: {
        type: 'string',
      },
      reason: {
        type: 'string',
      },
    }
  });

  if (help) {
    printHelp();
    process.exit(0);
  }

  if (!key) {
    logger.error('Missing --key argument');
    process.exit(1);
  }

  if (!reason) {
    logger.error('Missing --reason argument');
    process.exit(1);
  }

  const consumer = await db.consumer.findUnique({ where: { key } });

  if (!consumer) {
    logger.error('Consumer not found');
    process.exit(1);
  }

  await db.consumer.update({
    where: { key },
    data: {
      status: 'revoked',
    }
  });

  await db.consumerNote.create({
    data: {
      consumerId: consumer.id,
      note: `Set status to "revoked" - ${reason}`,
    }
  });

  logger.success('Consumer successfully updated');
}

function printHelp() {
  logger.underline('Use this script to update the permissions of an API consumer.');
  logger.log(' Arguments:');
  logger.log('   --key\t\tRequired\tAPI key of the consumer to update');
  logger.log('   --reason\t\tRequired\tReason for revoking this consumer');
}
