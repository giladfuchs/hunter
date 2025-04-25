import { ICellRendererParams } from 'ag-grid-community';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const ActionRender = ({ value }: ICellRendererParams) => (
    <>
        <IconButton size="small" aria-label="view" color="inherit" component={Link} to={`/view/${value}`}>
            <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" aria-label="view" color="inherit" component={Link} to={`/form/student/${value}`}>
            <EditIcon fontSize="small" />
        </IconButton>
    </>
);

export default ActionRender;
