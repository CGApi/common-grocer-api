import { getApp } from './app';
import { environment } from './utils/environment';

getApp().then((app) => {
  app.listen(environment.port(), () => {
    console.log(`App is listening on port ${environment.port()}`);
  });
});
