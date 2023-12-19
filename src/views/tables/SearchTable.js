import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import CategoryPage from 'src/pages/CategoryPage';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Abacus',
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Search Table" description="this is Search Table page">
      {/* breadcrumb */}
      <Breadcrumb title="Abacus" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <CategoryPage />
      </Box>
    </PageContainer>
  );
};

export default SearchTable;
