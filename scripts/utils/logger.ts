import chalk from 'chalk';

const warn = (...args) => console.warn(chalk.bold.yellow('WARN: '), ...args);
const error = (...args) => console.error(chalk.bold.red('ERROR: '), ...args);
const underline = (message: string) => console.log(chalk.underline(message));
const success = (...args) => console.log(chalk.bold.green('SUCCESS: '), chalk.green(...args));

export const logger = {
  ...console,
  warn,
  error,
  underline,
  success,
};
