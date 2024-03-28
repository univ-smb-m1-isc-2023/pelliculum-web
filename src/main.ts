import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER } from '@angular/core';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { appConfig } from './app/app.config';

// Configuration spécifique pour SocialAuthService
const socialAuthServiceConfig = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('Votre Google Client ID ici'),
      },
    ],
  } as SocialAuthServiceConfig,
};

// Fonction d'initialisation (si nécessaire)
function initializeApp() {
  return new Promise<void>((resolve) => {
    console.log("Toute logique d'initialisation ici");
    // Par exemple, configuration initiale ou vérification d'état.
    resolve();
  });
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, // Inclure les providers existants de appConfig
    socialAuthServiceConfig, // Ajouter la configuration pour SocialAuthService
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
