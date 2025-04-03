export type ConfigProps = {
    Sidebar_drawer: any;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    actTheme: string;
    fontTheme: string;
    inputBg: boolean;
    boxed: boolean;
    apiUrl: string
};

const config: ConfigProps = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    mini_sidebar: false,
    setHorizontalLayout: false, // Horizontal layout
    actTheme: 'DarkGreenTheme',
    fontTheme: 'Roboto',
    inputBg: false,
    apiUrl: 'http://0.0.0.0:5001',
    boxed: false
};

export default config;
