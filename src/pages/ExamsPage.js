import { Edit, Quiz } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ExamDialog from 'src/components/ExamDialog';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useDeleteExamMutation, useGetExamsQuery } from 'src/store/api/examsApi';
import { setExams } from 'src/store/reducers/examSlice';

const ExamsPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Exams',
    },
  ];

  const dispatch = useDispatch();
  // const exams = useSelector(selectExams);
  // const status = useSelector(selectStatus);
  // const error = useSelector(selectError);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const { data: exams, error, isLoading, refetch } = useGetExamsQuery();

  const [deleteExam, { isLoading: isDeleting, isError }] = useDeleteExamMutation();
  const [examId, setExamId] = useState('');

  const handleDelete = (ids) => {
    console.log({ ids });

    // Assuming deleteExam accepts a single ID
    const deletePromises = ids.map((id) => {
      return deleteExam(id)
        .unwrap() // Unwrap the result to access the fulfilled value
        .then((deletedExamId) => {
          console.log(`Exam with ID ${deletedExamId} deleted successfully`);
          // Return the deleted exam ID
          return deletedExamId;
        });
    });

    // Wait for all delete promises to resolve
    Promise.all(deletePromises)
      .then(() => {
        // Refetch after all exams are deleted
        refetch();
      })
      .catch((error) => {
        console.error('Failed to delete exams:', error);
        // Handle errors if needed
      });
  };

  useEffect(() => {
    if (exams) {
      dispatch(setExams(exams));
    }
  }, [dispatch, exams]);

  const headers = [
    { id: 'examName', numeric: false, disablePadding: false, label: 'Exam Name' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'duration', numeric: false, disablePadding: false, label: 'Duration' },
    {
      id: 'studentsRegistered',
      numeric: false,
      disablePadding: false,
      label: 'Students Registered',
    },
    { id: 'examFees', numeric: false, disablePadding: false, label: 'Exam Fees' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  ];

  const handleEdit = (id) => {
    // Perform actions when the Edit button is clicked, passing the examId
    setExamId(id);
    toggle();
    console.log('Edit clicked for examId:', id);
    // Additional logic can be added here, e.g., navigate to the edit page with the examId
  };

  if (isLoading || isDeleting) return <h1>Loading</h1>;

  return (
    <PageContainer title="Exams Page" description="This is the Exams Page">
      <Breadcrumb title={'Exams'} items={BCrumb} />
      {/* <button onClick={handleDelete} disabled={isDeleting}>
        {isLoading ? 'Deleting...' : 'Delete Exam'}
      </button> */}
      <Box>
        <TableLayout
          headers={headers}
          rows={exams}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Exams'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                Add New Exam
              </Button>
            </Box>
          }
          renderActionItems={(row) => (
            <>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => handleEdit(row.id)}>
                  <Edit size="1.1rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Questions">
                <IconButton
                  size="small"
                  // onClick={() => {
                  //   console.log({ row });
                  //   navigate(`/subjects/${subjectId}/questions/${row.id}`);
                  // }}
                >
                  <Quiz size="1.1rem" />
                </IconButton>
              </Tooltip>
            </>
          )}
        />
      </Box>
      <ExamDialog open={open} setOpen={setOpen} toggle={toggle} examId={examId} refetch={refetch} />
    </PageContainer>
  );
};

export default ExamsPage;
