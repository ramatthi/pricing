// import { AuthProviderFactory } from '@backstage/plugin-auth-backend';
// import { stringifyEntityRef, DEFAULT_NAMESPACE } from '@backstage/catalog-model';

// // Corrected import for the OIDC provider configuration
// import { OidcAuthenti } from '@backstage/plugin-auth-backend-module-oidc-provider';

// // Setup Keycloak OIDC configuration
// const keycloakOidcProviderFactory: AuthProviderFactory = (options) => {
//   return new OidcProvider({
//     clientId: 'your-client-id',
//     clientSecret: 'your-client-secret',
//     issuer: 'https://your-keycloak-domain/auth/realms/your-realm',
//     callbackUrl: 'http://localhost:7000/api/auth/keycloak/handler/frame', // Replace with your callback URL
//     scope: 'openid profile email',
//   });
// };

// export default async function createPlugin() {
//   return {
//     register: (reg) => {
//       reg.registerInit({
//         deps: { providers: 'auth.providers' },
//         async init({ providers }) {
//           providers.registerProvider({
//             providerId: 'keycloak',
//             factory: keycloakOidcProviderFactory,
//           });
//         },
//       });
//     },
//   };
// }
