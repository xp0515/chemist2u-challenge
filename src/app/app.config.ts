import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: '54.90.121.83:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  importProvidersFrom(
    SocketIoModule.forRoot(config)
  ),]
};
