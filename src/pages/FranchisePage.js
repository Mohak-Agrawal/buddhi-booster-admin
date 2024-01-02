import { Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import FranchiseDialog from 'src/components/FranchiseDialog';
import TableLayout from 'src/components/TableLayout';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useDeleteFranchiseMutation, useGetFranchisesQuery } from 'src/store/api/franchisesApi';
import { setFranchises } from 'src/store/slices/franchiseSlice';

const FranchisesPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Franchises',
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [franchiseId, setFranchiseId] = useState('');

  const toggle = () => {
    setOpen(!open);
  };

  const { data: franchises, error, isLoading, refetch } = useGetFranchisesQuery();
  const [deleteFranchise, { isLoading: isDeleting, isError }] = useDeleteFranchiseMutation();
  console.log('franchises', franchises);
  const handleEdit = (id) => {
    setFranchiseId(id);
    toggle();
    console.log('Edit clicked for franchiseId:', id);
  };

  const handleDelete = (ids) => {
    console.log({ ids });

    const deletePromises = ids.map((id) =>
      deleteFranchise(id)
        .unwrap()
        .then((deletedFranchiseId) => {
          console.log(`Franchise with ID ${deletedFranchiseId} deleted successfully`);
          return deletedFranchiseId;
        }),
    );

    Promise.all(deletePromises)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error('Failed to delete franchises:', error);
      });
  };

  useEffect(() => {
    if (franchises) {
      dispatch(setFranchises(franchises));
    }
  }, [dispatch, franchises]);

  const headers = [
    { id: 'franchiseName', numeric: false, disablePadding: false, label: 'Franchise Name' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    { id: 'centerNumber', numeric: false, disablePadding: false, label: 'Center Number' },

    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  ];

  if (isLoading || isDeleting) return <h1>Loading</h1>;

  return (
    <PageContainer title="Franchises Page" description="This is the Franchises Page">
      <Breadcrumb title={'Franchises'} items={BCrumb} />
      <Box>
        <TableLayout
          headers={headers}
          rows={franchises}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          searchPlaceholder={'Search Franchises'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                Add New Franchise
              </Button>
            </Box>
          }
          renderActionItems={(row) => (
            <>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => handleEdit(row.id)}>
                  <Edit size="1.1rem" />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="View Questions">
                <IconButton
                  size="small"
                  onClick={() => {
                    navigate(`/dashboard/franchise-questions/${row.id}`);
                  }}
                >
                  <Quiz size="1.1rem" />
                </IconButton>
              </Tooltip> */}
            </>
          )}
        />
      </Box>
      <FranchiseDialog
        open={open}
        setOpen={setOpen}
        toggle={toggle}
        franchiseId={franchiseId}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default FranchisesPage;
