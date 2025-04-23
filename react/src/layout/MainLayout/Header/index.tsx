import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';

export interface HeaderProps {
    handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: HeaderProps) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box>

            {/* notification & profile */}
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;
