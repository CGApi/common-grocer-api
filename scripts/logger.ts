import chalk from 'chalk';

const warn = (...args) => console.warn(chalk.bold.yellow('WARN: '), ...args);
const error = (...args) => console.error(chalk.bold.red('ERROR: '), ...args);
const underline = (message: string) => console.log(chalk.underline(message));

export const logger = {
  ...console,
  warn,
  error,
  underline,
};
