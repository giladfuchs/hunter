import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import SubCard from 'ui-component/cards/SubCard';
import { Divider, Grid, List, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';

import { Assignment, DefaultRootStateProps, ModelType, Student } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchListByModel } from '../store/modelSlice';

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => (
    <SubCard title={assignment.title} contentSX={{ p: 2 }}>
        <Typography variant="body2">Due: {assignment.detail}</Typography>
    </SubCard>
);

const StudentProfile = ({ student }: { student: Student }) => (
    <Grid item lg={4} xs={12}>
        <SubCard
            title={
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" variant="subtitle1">
                            {student.name}
                        </Typography>
                    </Grid>
                </Grid>
            }
        >
            <List component="nav" aria-label="grade">
                <ListItemButton>
                    <ListItemIcon>
                        <SchoolIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Grade</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="subtitle2" align="right">
                            {student.grade}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemIcon>
                        <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                    <ListItemSecondaryAction>
                        <Typography variant="subtitle2" align="right">
                            {student.phone}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </List>
        </SubCard>
    </Grid>
);

const StudentView = () => {
    const params = useParams();
    const { id } = params as {
        id: string | number;
    };
    const { list } = useSelector((state: DefaultRootStateProps) => state.models);
    const [student, setStudent] = React.useState(list[ModelType.student][0]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(
            fetchListByModel({
                model: ModelType.student,
                data: { query: [{ key: 'id', value: id, opt: 'eq' }] }
            })
        );
    }, [dispatch, id]);
    React.useEffect(() => {
        setStudent(list[ModelType.student][0]);
    }, [list]);
    return (
        <MainCard>
            <Grid container spacing={3}>
                <StudentProfile student={student} />

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        Assignments
                    </Typography>
                    <Grid container spacing={2}>
                        {student.assignments.map((assignment: Assignment) => (
                            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                                <AssignmentCard assignment={assignment} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};
export default StudentView;
