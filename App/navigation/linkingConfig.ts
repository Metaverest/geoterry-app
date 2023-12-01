import { PREFIX_LINK } from 'App/constants/common';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';

export const ROUTES = {
  PUBLIC_ROUTES: {
    SPLASH_SCREEN: 'splash',
    LOGIN_SCREEN: 'login',
    OTP_SCREEN: 'otp',
    REGISTER_SCREEN: 'register',
  },
  AUTH_ROUTES: {
    PROFILE_SCREEN: 'profile/:profileID',
  },
};

const config = {
  screens: {
    [ENavigationScreen.SPLASH_SCREEN]: {
      path: ROUTES.PUBLIC_ROUTES.SPLASH_SCREEN,
    },
    [ENavigationScreen.LOGIN_SCREEN]: {
      path: ROUTES.PUBLIC_ROUTES.LOGIN_SCREEN,
    },
    [ENavigationScreen.OTP_SCREEN]: {
      path: ROUTES.PUBLIC_ROUTES.OTP_SCREEN,
    },
    [ENavigationScreen.REGISTER_SCREEN]: {
      path: ROUTES.PUBLIC_ROUTES.REGISTER_SCREEN,
    },

    [ENavigationScreen.MAIN_GAME_NAVIGATOR]: {
      screens: {
        [EMainGameScreen.PROFILE_SCREEN]: {
          path: ROUTES.AUTH_ROUTES.PROFILE_SCREEN,
        },
      },
    },
  },
};
const linking = {
  prefixes: [`${PREFIX_LINK}://`],
  config,
};

export { linking };
