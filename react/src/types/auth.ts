export type JWTContextType = {
    isLoggedIn: boolean;
    logout: () => void;
    login: (id: string, phone: string) => Promise<void>;
};
