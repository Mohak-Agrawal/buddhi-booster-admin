import { Quiz } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const LecturesPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Lectures',
    },
  ];
  const headers = [
    { id: 'categories', numeric: false, disablePadding: false, label: 'Categories' },
    { id: 'pname', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'level', numeric: false, disablePadding: false, label: 'Level' },
  ];

  const rows = [
    {
      categories: 'Category 1',
      pname: '2023-01-01',
      status: 'Active',
      level: 'Beginner',
    },
  ];

  return (
    <PageContainer title="Search Table" description="this is Search Table page">
      <Breadcrumb title={'Abacus'} items={BCrumb} />

      <Box>
        <TableLayout
          headers={headers}
          rows={rows}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          subjectId="yourSubjectId"
          navigate={(path) => console.log('Navigate to:', path)}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth>
                Add New Category
              </Button>
            </Box>
          }
          renderActionItems={
            <Tooltip title="View Questions">
              <IconButton
                size="small"
                // onClick={() => {
                //   console.log({ row });
                //   navigate(`/subjects/${subjectId}/questions/${row.id}`);
                // }}
              >
                <Quiz size="1.1rem" />
              </IconButton>
            </Tooltip>
          }
        />
      </Box>
    </PageContainer>
  );
};

export default LecturesPage;
