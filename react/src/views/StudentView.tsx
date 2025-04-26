import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import SubCard from 'ui-component/cards/SubCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';

import { Assignment, DefaultRootStateProps, ModelType, Student } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRowById, fetchListByModel, setAssignments, setUserAndStudentId } from '../store/modelSlice';
import { AppDispatch } from 'store';

const StudentProfile = ({ student }: { student: Student }) => {
    const dispatch = useDispatch<AppDispatch>(); // use your typed dispatch
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        try {
            await dispatch(
                deleteRowById({
                    model: ModelType.student,
                    id
                })
            ).unwrap();
            console.log('Assignment deleted successfully');
            navigate(`/${ModelType.student}`);
            // Optionally: dispatch(fetchListByModel({ model: ModelType.assignment })) to refresh
        } catch (error) {
            console.error('Failed to delete assignment', error);
        }
    };
    return (
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
                secondary={
                    <>
                        <IconButton size="small" color="secondary" component={Link} to={`/form/${ModelType.student}/${student.id}`}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(student.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
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
};

const AssignmentCard = ({ assignments }: { assignments: Assignment[] }) => {
    const dispatch = useDispatch<AppDispatch>(); // use your typed dispatch

    const handleDelete = async (id: number) => {
        try {
            await dispatch(
                deleteRowById({
                    model: ModelType.assignment,
                    id
                })
            ).unwrap();
            console.log('Assignment deleted successfully');
            dispatch(setAssignments(assignments.filter((a) => a.id !== id)));

            // Optionally: dispatch(fetchListByModel({ model: ModelType.assignment })) to refresh
        } catch (error) {
            console.error('Failed to delete assignment', error);
        }
    };
    return (
        <>
            <MainCard
                title="Assignments"
                container
                spacing={2}
                secondary={
                    <IconButton size="medium" color="primary" component={Link} to={`/form/${ModelType.assignment}/add`}>
                        <AddBoxIcon fontSize="medium" />
                    </IconButton>
                }
            >
                {assignments.map((assignment: Assignment) => (
                    <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                        <SubCard contentSX={{ p: 2 }}>
                            <Typography variant="h3" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                                {assignment.title}
                            </Typography>
                            <Divider sx={{ p: 1 }} />
                            <Typography variant="body2" color="textPrimary">
                                {assignment.detail}
                            </Typography>
                            <Grid container spacing={1} sx={{ mt: 1 }}>
                                <Grid item>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(assignment.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        component={Link}
                                        to={`/form/${ModelType.assignment}/${assignment.id}`}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                ))}
            </MainCard>
        </>
    );
};

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
        const student_obj = list[ModelType.student][0];

        if (student_obj) {
            setStudent(student_obj);

            if (student.assignments) {
                dispatch(setAssignments(student_obj.assignments));
            }

            dispatch(
                setUserAndStudentId({
                    user_id: student_obj.teacher_id,
                    student_id: student_obj.id
                })
            );
        }
    }, [list, dispatch]);
    return (
        <MainCard>
            <Grid container spacing={3}>
                <StudentProfile student={student} />

                <Grid item xs={12} md={8}>
                    <AssignmentCard assignments={student.assignments} />
                </Grid>
            </Grid>
        </MainCard>
    );
};
export default StudentView;
