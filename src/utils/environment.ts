import * as dotenv from 'dotenv';

export const environment = {
  loadEnv: () => {
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config();
    }
  },
  port: () => process.env.PORT || 3000,
};
