import { PREFIX_LINK } from 'App/constants/common';
import { EMainGameScreen, ENavigationScreen } from 'App/enums/navigation';

const config = {
  screens: {
    [ENavigationScreen.MAIN_GAME_NAVIGATOR]: {
      screens: {
        [EMainGameScreen.PROFILE_SCREEN]: {
          path: 'profile/:profileID',
        },
      },
    },
  },
};
const linking = {
  prefixes: [`${PREFIX_LINK}://`, `https://${PREFIX_LINK}.com`],
  config,
};

export { linking };
