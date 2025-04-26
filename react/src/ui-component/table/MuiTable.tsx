import * as React from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';

import { DefaultRootStateProps, get_table_head_cell, ModelType } from 'types';

import { fetchListByModel } from '../../store/modelSlice';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';

const MuiTable = ({ model }: { model: ModelType }) => {
    const { cells, heads } = get_table_head_cell(model);
    const dispatch = useDispatch();

    const { list, loading, error } = useSelector((state: DefaultRootStateProps) => state.models);
    const tableData: any[] = list[model];

    React.useEffect(() => {
        dispatch(fetchListByModel({ model }));
    }, [dispatch, model]);
    return (
        <Grid item xs={12}>
            <MainCard
                content={false}
                title={model}
                secondary={
                    <IconButton size="medium" color="primary" component={Link} to={`/form/${model}/add`}>
                        <AddBoxIcon fontSize="medium" />
                    </IconButton>
                }
            >
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="mui table">
                        <TableHead>
                            <TableRow>
                                {cells.map((cell: string) => (
                                    <TableCell key={cell} align="left">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row: any) => (
                                <TableRow hover key={row.id}>
                                    {cells.map((cell: string) => (
                                        <TableCell align="left" key={`${cell}_${row[cell]}`}>
                                            {row[cell]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </Grid>
    );
};

export default MuiTable;
