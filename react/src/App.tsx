import { useSelector } from 'react-redux';

import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from 'routes';
import { DefaultRootStateProps } from 'types';
import themes from 'themes';
import Locales from 'ui-component/layout/Locales';
import { AuthProvider } from 'contexts/UseAuth';
import AxiosInterceptor from './contexts/AxiosInterceptor';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

const App = () => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <Locales>
                    <AuthProvider>
                        <AxiosInterceptor>
                            <>
                                <Routes />
                            </>
                        </AxiosInterceptor>
                    </AuthProvider>
                </Locales>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
