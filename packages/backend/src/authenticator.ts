import { Strategy as ProviderStrategy } from 'passport-provider-a';
import {
  createOAuthAuthenticator,
  PassportOAuthAuthenticatorHelper,
  PassportOAuthDoneCallback,
  
  PassportProfile,
} from '@backstage/plugin-auth-node';

/** @public */
export const providerAuthenticator = createOAuthAuthenticator({
  defaultProfileTransform:
    PassportOAuthAuthenticatorHelper.defaultProfileTransform,
  scopes: {
    // Scopes required by the provider
    required: ['openid', 'email', 'profile', 'offline_access'],
  },
  initialize({ callbackUrl, config }) {
    const clientId = config.getString('auth.providers.keycloak.development.clientId');
    const clientSecret = config.getString('auth.providers.keycloak.development.clientSecret');

    return PassportOAuthAuthenticatorHelper.from(
      new ProviderStrategy(
        {
          clientID: clientId,
          clientSecret: clientSecret,
          // ... other options
        },
        (
          accessToken: string,
          refreshToken: string,
          params: any,
          fullProfile: PassportProfile,
          done: PassportOAuthDoneCallback,
        ) => {
          done(
            undefined,
            { fullProfile, params, accessToken },
            { refreshToken },
          );
        },
      ),
    );
  },

  async start(input, helper) {
    return helper.start(input);
  },

  async authenticate(input, helper) {
    return helper.authenticate(input);
  },

  async refresh(input, helper) {
    return helper.refresh(input);
  },
});