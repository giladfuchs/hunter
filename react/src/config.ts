import { PaletteMode } from '@mui/material';

const config: {
    basename: string;
    defaultPath: string;
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    theme: PaletteMode;
    presetColor: string;
    i18n: string;
    rtlLayout: boolean;
    gridSpacing: number;
} = {
    basename: '',
    defaultPath: '/student',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light',
    presetColor: 'default',
    i18n: 'en',
    rtlLayout: false,
    gridSpacing: 3
};

export default config;
