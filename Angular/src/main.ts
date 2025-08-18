import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  // @ts-expect-warning: `console.error` is used here intentionally for simple error logging during bootstrap
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
