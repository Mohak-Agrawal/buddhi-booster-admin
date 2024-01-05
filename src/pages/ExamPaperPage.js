import { Box, Button } from '@mui/material';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import CsvUploadButton from 'src/components/project/CsvUploadButton';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import {
  useCreateQuestionForExamMutation,
  useGetExamByIdQuery,
  useGetQuestionsForExamQuery,
} from 'src/store/api/examsApi'; // Update the import statement

const ExamPaperPage = () => {
  const { examId } = useParams();

  const [parsedQuestions, setParsedQuestions] = useState([]);
  const dispatch = useDispatch();
  const {
    data: allQuestions,
    isLoading,
    refetch: refetchQuestions,
  } = useGetQuestionsForExamQuery(examId);
  const { data: examDetails, isLoading: examDetailsLoading, refetch } = useGetExamByIdQuery(examId);
  console.log({ examDetails });
  const { examName } = examDetails ?? {};

  const sortedQuestions = allQuestions ? [...allQuestions].sort((a, b) => a.sNo - b.sNo) : [];

  console.log({ sortedQuestions });

  useEffect(() => {
    refetch();
  }, []);

  const [createExamQuestions, { isLoading: isCreateExamLoading, isError }] =
    useCreateQuestionForExamMutation();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: `/dashboard/exams`, title: 'Exams' },
    { title: examName },
  ];

  const headers = [
    { id: 'sNo', numeric: false, disablePadding: false, label: 'S.No.' },
    { id: 'question', numeric: false, disablePadding: false, label: 'Question' },
    { id: 'option1', numeric: false, disablePadding: false, label: 'Option 1' },
    { id: 'option2', numeric: false, disablePadding: false, label: 'Option 2' },
    { id: 'option3', numeric: false, disablePadding: false, label: 'Option 3' },
    { id: 'option4', numeric: false, disablePadding: false, label: 'Option 4' },
    { id: 'correctAnswer', numeric: false, disablePadding: false, label: 'Correct Answer' },
  ];

  const handleFileUpload = (file) => {
    // Ensure that event and event.target are defined

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data.slice(1).map((row, index) => ({
            sNo: index + 1,
            question: String(row[0]),
            option1: String(row[1]),
            option2: String(row[2]),
            option3: String(row[3]),
            option4: String(row[4]),
            correctAnswer: String(row[row.length - 1]),
          }));

          console.log('parsedData', parsedData);
          setParsedQuestions(parsedData);
        },
        dynamicTyping: false,
        header: false,
        skipEmptyLines: 'greedy',
        transformHeader: (header) => header.trim(),
      });
    }
  };

  const handleDelete = (ids) => {
    console.log({ ids });

    // const deletePromises = ids.map((id) =>
    //   deleteExam(id)
    //     .unwrap()
    //     .then((deletedExamId) => {
    //       console.log(`Exam with ID ${deletedExamId} deleted successfully`);
    //       return deletedExamId;
    //     }),
    // );

    // Promise.all(deletePromises)
    //   .then(() => {
    //     refetch();
    //   })
    //   .catch((error) => {
    //     console.error('Failed to delete exams:', error);
    //   });
  };

  const uploadQuestionsToFirestore = async (questions) => {
    try {
      const result = await createExamQuestions({
        examId: examId,
        questions: questions,
      }).unwrap();
      console.log('Questions created successfully:', result);
      refetchQuestions();
      // Do something with the result, e.g., refetch the list of exams
    } catch (error) {
      console.error('Error creating questions:', error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    if (parsedQuestions.length > 0) {
      uploadQuestionsToFirestore(parsedQuestions);
    }
  }, [parsedQuestions]);

  if (isLoading || examDetailsLoading) return <h1>Loading</h1>;

  return (
    <PageContainer title={'Exam Questions'} description={'description'}>
      <Breadcrumb title={examName + ' Questions'} items={BCrumb} />
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <CsvUploadButton onFileUpload={handleFileUpload} />
      <Box>
        <TableLayout
          headers={headers}
          rows={sortedQuestions}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Questions'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          // renderActionItems={(row) => <></>}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth>
                Download CSV Template
              </Button>
            </Box>
          }
        />
      </Box>
    </PageContainer>
  );
};

export default ExamPaperPage;
