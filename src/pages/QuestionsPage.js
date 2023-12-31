import { Box } from '@mui/material';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import CsvUploadButton from 'src/components/project/CsvUploadButton';
import QuestionView from 'src/components/project/QuesionView';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { createQuestion, fetchQuestionsByCategory } from 'src/store/slices/questionSlice';

const QuestionsPage = ({ match }) => {
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const { subjectId, categoryId } = useParams();
  const allQuestions = useSelector((state) => state?.question?.questions);
  const currentSubject = useSelector((state) => state?.subjects?.subject);
  const currentCategories = useSelector((state) => state?.category?.categories);
  console.log(categoryId, currentCategories);
  const currentCategoryDetails = currentCategories?.find((item) => item.id === categoryId);
  console.log({ currentCategoryDetails });
  // const { subjectId, questionId } = match.params;

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: `/subjects/${subjectId}`,
      title: currentSubject?.name,
    },
    {
      title: currentCategoryDetails?.name,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch questions when the component mounts

    dispatch(fetchQuestionsByCategory(categoryId));
  }, [dispatch]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          // 'result.data' contains an array of objects parsed from the CSV
          const transposedMatrix = transpose(result.data);

          setParsedQuestions(transposedMatrix);
        },
        header: false, // Assumes the first row contains headers
        skipEmptyLines: 'greedy', // Skip empty lines
        transformHeader: (header) => header.trim(), // Trim headers
      });
    }
  };

  const uploadQuestionsToFirestore = async (questions) => {
    // Implement your Firestore upload logic here
    let arr = [];
    console.log('Uploading questions to Firestore:', questions);
    questions.map((item, index) => {
      arr.push({ categoryId: categoryId, question: item });
    });
    dispatch(createQuestion(arr));
  };

  // Inside the component
  useEffect(() => {
    if (parsedQuestions.length > 0) {
      uploadQuestionsToFirestore(parsedQuestions);
    }
  }, [parsedQuestions]);

  const transpose = (matrix) => {
    return matrix[0].map((_, columnIndex) => matrix.map((row) => row[columnIndex]));
  };

  const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set your desired page size
  const totalPages = Math.ceil(allQuestions / pageSize);

  return (
    <PageContainer
      title={currentCategoryDetails?.name}
      description={currentCategoryDetails?.description}
    >
      {/* breadcrumb */}
      <Breadcrumb title={currentCategoryDetails?.name} items={BCrumb} />
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <CsvUploadButton onFileUpload={handleFileUpload} />
      {/* end breadcrumb */}{' '}
      {/* <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages} // You need to calculate total pages based on the total number of questions
        onPageChange={(page) => setCurrentPage(page)}
      /> */}
      <Box>{allQuestions?.length > 0 && <QuestionView questions={allQuestions ?? []} />}</Box>
    </PageContainer>
  );
};

export default QuestionsPage;
