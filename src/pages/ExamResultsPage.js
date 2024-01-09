import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useGetAllUsersScoresQuery, useUpdateExamMutation } from 'src/store/api/examsApi';

const ExamResultsPage = () => {
  const { examId } = useParams();
  console.log('examId', examId);

  const { data: examScores, isLoading: scoresLoading, refetch } = useGetAllUsersScoresQuery(examId);
  console.log('examScores', examScores);
  const [updateExamMutation] = useUpdateExamMutation();

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
    {
      id: 'correctAnswers',
      numeric: false,
      disablePadding: false,
      label: 'Correct Questions',
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

  const [searchTerm, setSearchTerm] = useState('');

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

  const toggleResult = async () => {
    // await updateExamMutation({ examId, updatedExamData: formData });
  };

  if (scoresLoading) return <h1>Loading</h1>;

  // Sort the rows based on the score in descending order
  const sortedRows = examScores?.slice().map((score, index) => ({ ...score, rank: index + 1 }));

  const filteredUsers = sortedRows
    ? sortedRows.filter(
        (user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
        // Add other fields as needed
      )
    : [];

  return (
    <PageContainer title={'Exam Questions'} description={'description'}>
      <Breadcrumb title={'User Scores'} items={BCrumb} />

      <Box>
        <TableLayout
          headers={headers}
          rows={filteredUsers.map((score) => ({
            ...score,
            completionTime: convertSecondsToMinutes(score.completionTime),
          }))}
          handleSearch={(event) => setSearchTerm(event.target.value)}
          search={searchTerm}
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Questions'}
          navigate={(path) => console.log('Navigate to:', path)}
          // handleDelete={handleDelete}
          // renderActionItems={(row) => <></>}
          renderButton={
            <>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginRight: 10 }}
                onClick={toggleResult}
              >
                Publish Result
              </Button>
              <CSVLink
                data={csvData}
                headers={headers.map((header) => ({ label: header.label, key: header.id }))}
                filename={`exam_results_${examId}.csv`}
              >
                <Button color="primary" variant="contained">
                  Download Result
                </Button>
              </CSVLink>
            </>
          }
        />
      </Box>
    </PageContainer>
  );
};

export default ExamResultsPage;
