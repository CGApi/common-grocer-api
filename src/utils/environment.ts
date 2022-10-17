import * as dotenv from 'dotenv';

export const loadEnv = () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
};

export const environment = {
  port: process.env.PORT || 3000,
};
