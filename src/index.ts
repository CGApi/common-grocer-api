import { app } from './app';
import { environment } from './utils/environment';

app.listen(environment.port, () => {
  console.log(`App is listening on port ${environment.port}`);
});
