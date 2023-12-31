import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FranchiseList from 'src/components/FranchiseList';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { fetchAllFranchises } from 'src/store/slices/franchiseSlice';
// import FranchiseList from 'src/components/FranchiseList';

const FranchisePage = () => {
  const dispatch = useDispatch();

  const BCrumb = [
    {
      to: '/dashboard/home',
      title: 'Home',
    },
    {
      title: 'Franchise',
    },
  ];

  useEffect(() => {
    dispatch(fetchAllFranchises());
  }, [dispatch]);

  return (
    <PageContainer title="Franchise" description="this is Search Table page">
      {/* breadcrumb */}
      <Breadcrumb title={'Franchises'} items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <FranchiseList />
      </Box>
    </PageContainer>
  );
};

export default FranchisePage;
