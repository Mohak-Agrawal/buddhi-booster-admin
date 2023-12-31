// SubjectPage.js
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import CategoryPage from 'src/pages/CategoryPage';
import { useGetSubjectByIdQuery } from 'src/store/api/subjectsApi';

const SubjectPage = () => {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const {
    data: currentSubject,
    isLoading,
    refetch,
    isFetching,
  } = useGetSubjectByIdQuery(subjectId);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: currentSubject?.name,
    },
  ];

  useEffect(() => {
    refetch();
  }, [subjectId]);

  if (isLoading || isFetching) return <h1>Loading</h1>;

  return (
    <PageContainer title="Search Table" description="this is Search Table page">
      {/* breadcrumb */}
      <Breadcrumb title={currentSubject?.name} items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <CategoryPage subjectId={subjectId} />
      </Box>
    </PageContainer>
  );
};

export default SubjectPage;
