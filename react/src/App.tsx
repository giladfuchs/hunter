import { useSelector } from 'react-redux';

import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

import { DefaultRootStateProps } from 'types';

import themes from 'themes';

import Locales from 'ui-component/Locales';
import Snackbar from 'ui-component/extended/Snackbar';

// auth provider
import { AuthProvider } from 'contexts/AuthContext';
import AxiosInterceptor from './contexts/AxiosInterceptor';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                {/* RTL layout */}
                {/* <RTLLayout> */}
                <Locales>
                    <AuthProvider>
                        <AxiosInterceptor>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AxiosInterceptor>
                    </AuthProvider>
                </Locales>
                {/* </RTLLayout> */}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
