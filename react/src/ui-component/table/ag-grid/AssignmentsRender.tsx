import { ICellRendererParams } from 'ag-grid-community';
import { Button, Popper, Paper } from '@mui/material';
import React, { useState, useRef } from 'react';
import { Assignment } from '../../../types';

const AssignmentsHover = ({ assignments }: { assignments: Assignment[] }) => (
    <div>{assignments?.length ? assignments.map((a, i) => <div key={i}>{a.title}</div>) : <em>No assignments</em>}</div>
);

const AssignmentsRender = ({ value }: ICellRendererParams) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button ref={anchorRef} variant="contained" size="small" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                Hover me
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <Paper sx={{ padding: 1, minWidth: 200 }}>
                    <AssignmentsHover assignments={value} />
                </Paper>
            </Popper>
        </>
    );
};
export default AssignmentsRender;
