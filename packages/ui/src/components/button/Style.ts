import {Theme} from '../../token/theme';

export const Style = {
  Button: {
    Filled: {
      Enabled: {
        backgroundColor: Theme.colors.globalDarkPaletteRed500,
        width: 335,
        height: 48,
        borderWidth: 2,
        borderRadius: 24,
        textColor: '#ffffff',
      },
      Disabled: {
        backgroundColor: Theme.colors.globalDarkPaletteGray900,
        width: 335,
        height: 48,
        borderWidth: 2,
        borderRadius: 24,
        textColor: Theme.colors.globalDarkPaletteGray300,
      },
    },
    Outlined: {
      Enabled: {
        backgroundColor: '#0000000',
        width: 335,
        height: 48,
        borderWidth: 2,
        borderRadius: 24,
        textColor: '#000000',
        borderColor: Theme.colors.globalDarkPaletteRed500,
      },
      Disabled: {
        backgroundColor: '#0000000',
        width: 335,
        height: 48,
        borderWidth: 2,
        borderRadius: 24,
        textColor: '#909198',
        borderColor: Theme.colors.globalDarkPaletteGray900,
      },
    },
  },
};
