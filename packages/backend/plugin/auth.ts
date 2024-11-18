import { AuthProviderFactory } from '@backstage/plugin-auth-backend';
import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

// Corrected import for the OIDC provider configuration
import OidcProvider from '@backstage/plugin-auth-backend-module-oidc-provider'; // Default import

// Setup Keycloak OIDC configuration
const keycloakOidcProviderFactory: AuthProviderFactory = (options) => {
  // Assuming OidcProvider is a function, not a class, so we don't use `new`
  return OidcProvider({
    clientId: 'Backstage_Keycloak',
    clientSecret: 'X9jjURan8exVip4jacDHRRLNf3MJU3Cp',
    issuer: 'http://localhost:8080/realms/BackStage',
    callbackUrl: 'http://localhost:7000/api/auth/keycloak/handler/frame',
    // scope: 'openid profile email', // Uncomment if needed
  });
};

export default async function createPlugin() {
  return {
    register: (reg) => {
      reg.registerInit({
        deps: { providers: 'auth.providers' },
        async init({ providers }) {
          providers.registerProvider({
            providerId: 'keycloak',
            factory: keycloakOidcProviderFactory,
          });
        },
      });
    },
  };
}
