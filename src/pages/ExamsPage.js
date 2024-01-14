import { Assessment, Edit, Quiz } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ExamDialog from 'src/components/ExamDialog';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useDeleteExamMutation, useGetExamsQuery } from 'src/store/api/examsApi';
import { useGetSubjectsQuery } from 'src/store/api/subjectsApi';
import { setExams } from 'src/store/slices/examSlice';
import { setSubjects } from 'src/store/slices/subjectSlice';

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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [examId, setExamId] = useState('');

  const toggle = () => {
    setOpen(!open);
  };

  const { data: exams, error, isLoading, refetch } = useGetExamsQuery();
  const { data: subjects, error: subjectError, isLoading: subjectLoading } = useGetSubjectsQuery();
  const [deleteExam, { isLoading: isDeleting, isError }] = useDeleteExamMutation();

  console.log('exams', exams);

  const handleEdit = (id) => {
    toggle();
    setExamId(id);
    console.log('Edit clicked for examId:', id);
  };

  const handleDelete = (ids) => {
    console.log({ ids });

    const deletePromises = ids.map((id) =>
      deleteExam(id)
        .unwrap()
        .then((deletedExamId) => {
          console.log(`Exam with ID ${deletedExamId} deleted successfully`);
          return deletedExamId;
        }),
    );

    Promise.all(deletePromises)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error('Failed to delete exams:', error);
      });
  };

  useEffect(() => {
    if (subjects) {
      console.log({ subjects });
      dispatch(setSubjects(subjects));
    }
  }, [dispatch, exams]);

  useEffect(() => {
    if (exams) {
      dispatch(setExams(exams));
    }
  }, [dispatch, exams]);

  const headers = [
    { id: 'examName', numeric: false, disablePadding: false, label: 'Exam Name' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date & Time' },
    {
      id: 'subjectName',
      numeric: false,
      disablePadding: false,
      label: 'Subject',
    },
    { id: 'duration', numeric: false, disablePadding: false, label: 'Duration (minutes)' },
    // {
    //   id: 'studentsRegistered',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Students Registered',
    // },

    { id: 'examFees', numeric: false, disablePadding: false, label: 'Exam Fees' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  ];

  const formattedExams = exams?.map((exam) => {
    const examDate = new Date(exam.date);

    // Format the date as "dd mm yy hh:mm am/pm"
    const formattedDate = examDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      ...exam,
      date: formattedDate,
    };
  });
  if (isLoading || isDeleting) return <h1>Loading</h1>;

  return (
    <PageContainer title="Exams Page" description="This is the Exams Page">
      <Breadcrumb title={'Exams'} items={BCrumb} />
      <Box>
        <TableLayout
          headers={headers}
          rows={formattedExams}
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
                  onClick={() => {
                    navigate(`/dashboard/exam-questions/${row.id}`);
                  }}
                >
                  <Quiz size="1.1rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Results">
                <IconButton
                  size="small"
                  onClick={() => {
                    navigate(`/dashboard/exam-results/${row.id}`);
                  }}
                >
                  <Assessment size="1.1rem" />
                </IconButton>
              </Tooltip>
            </>
          )}
        />
      </Box>
      <ExamDialog
        open={open}
        setOpen={setOpen}
        toggle={toggle}
        examId={examId}
        setExamId={setExamId}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default ExamsPage;
