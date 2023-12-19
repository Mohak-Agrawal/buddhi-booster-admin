import * as React from 'react';

import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import CategoryPage from 'src/pages/CategoryPage';
import { fetchSubjectById } from 'src/store/reducers/subjectSlice';

const SubjectPage = () => {
  const dispatch = useDispatch();
  const { subjectId, categoryId } = useParams();
  const currentSubject = useSelector((state) => state?.subjects?.subject);
  console.log({ currentSubject });

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: currentSubject?.name,
    },
  ];

  React.useEffect(() => {
    // Fetch the subject when the component mounts

    dispatch(fetchSubjectById(subjectId));
  }, [dispatch, subjectId]);

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
