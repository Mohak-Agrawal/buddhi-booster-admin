import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useGetAllUsersScoresQuery } from 'src/store/api/examsApi';

const ExamResultsPage = () => {
  const { examId } = useParams();
  console.log('examId', examId);

  const { data: examScores, isLoading: scoresLoading, refetch } = useGetAllUsersScoresQuery(examId);
  console.log('examScores', examScores);

  useEffect(() => {
    refetch();
  }, []);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: `/dashboard/exams`, title: 'Exams' },
    { title: 'User Scores' },
  ];

  const headers = [
    { id: 'rank', numeric: false, disablePadding: false, label: 'Rank' },
    { id: 'fullName', numeric: false, disablePadding: false, label: 'Student Name' },
    { id: 'score', numeric: false, disablePadding: false, label: 'Score' },
    { id: 'completionTime', numeric: false, disablePadding: false, label: 'Completion Time' },
    {
      id: 'attemptedQuestions',
      numeric: false,
      disablePadding: false,
      label: 'Attempted Questions',
    },
    { id: 'wrongAnswers', numeric: false, disablePadding: false, label: 'Wrong Answers' },
    { id: 'skippedQuestions', numeric: false, disablePadding: false, label: 'Skipped Questions' },
  ];

  // Function to convert seconds to minutes
  const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Function to handle CSV download
  const csvData = examScores?.map((score, index) => ({
    rank: index + 1,
    fullName: score.fullName,
    score: score.score,
    completionTime: convertSecondsToMinutes(score.completionTime),
    attemptedQuestions: score.attemptedQuestions,
    wrongAnswers: score.wrongAnswers,
    skippedQuestions: score.skippedQuestions,
  }));

  if (scoresLoading) return <h1>Loading</h1>;

  // Sort the rows based on the score in descending order
  const sortedRows = examScores?.slice().map((score, index) => ({ ...score, rank: index + 1 }));

  return (
    <PageContainer title={'Exam Questions'} description={'description'}>
      <Breadcrumb title={'User Scores'} items={BCrumb} />

      <Box>
        <TableLayout
          headers={headers}
          rows={sortedRows.map((score) => ({
            ...score,
            completionTime: convertSecondsToMinutes(score.completionTime),
          }))}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Questions'}
          navigate={(path) => console.log('Navigate to:', path)}
          // handleDelete={handleDelete}
          // renderActionItems={(row) => <></>}
          renderButton={
            <Box>
              <CSVLink
                data={csvData}
                headers={headers.map((header) => ({ label: header.label, key: header.id }))}
                filename={`exam_results_${examId}.csv`}
              >
                <Button color="primary" variant="contained" fullWidth>
                  Download Result
                </Button>
              </CSVLink>
            </Box>
          }
        />
      </Box>
    </PageContainer>
  );
};

export default ExamResultsPage;
