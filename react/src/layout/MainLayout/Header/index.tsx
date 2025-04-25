import { useTheme } from '@mui/material/styles';
import { Box, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import LocalizationSection from './LocalizationSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import config from '../../../config';

const Header = () => (
    <>
        <Button variant="contained" color="secondary" startIcon={<HomeIcon />} component={Link} to={config.defaultPath}>
            <Box sx={{ flexGrow: 1 }} />
            Home
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        {/* live customization & localization */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}>
            <LocalizationSection />
        </Box>
        <Divider />

        {/* notification & profile */}
        <ProfileSection />

        {/* mobile header */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileSection />
        </Box>
    </>
);

export default Header;
