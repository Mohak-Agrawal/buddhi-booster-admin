import * as React from 'react';

import { Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ProductTableList from 'src/components/apps/ecommerce/ProductTableList/ProductTableList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchAllFranchises } from 'src/store/reducers/franchiseSlice';
import FranchiseList from 'src/components/FranchiseList';

const FranchisePage = () => {
  const dispatch = useDispatch();

  const BCrumb = [
    {
      to: '/',
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
      {/* <Breadcrumb title={currentSubject?.name} items={BCrumb} /> */}
      {/* end breadcrumb */}
      <Box>
        <FranchiseList subjectId={'kjhbhbku'} />
      </Box>
    </PageContainer>
  );
};

export default FranchisePage;
