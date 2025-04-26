import { Box, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection';
import config from '../../../config';

const Header = () => (
    <>
        <Button variant="contained" color="secondary" startIcon={<HomeIcon />} component={Link} to={config.defaultPath}>
            <Box sx={{ flexGrow: 1 }} />
            Home
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        <Divider />

        {/* notification & profile */}
        <ProfileSection />
    </>
);

export default Header;
