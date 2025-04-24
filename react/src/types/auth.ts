export type AuthContextType = {
    isLoggedIn: boolean;
    logout: () => void;
    login: (id: string, phone: string) => Promise<void>;
};
