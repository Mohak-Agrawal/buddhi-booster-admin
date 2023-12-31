import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import TableLayout from 'src/components/TableLayout';
import UserDialog from 'src/components/UserDialog'; // Assuming you have a UserDialog component
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useDeleteUserMutation, useGetUsersQuery } from 'src/store/api/usersApi';
import { setUsers } from 'src/store/reducers/userSlice';

const UsersPage = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Users',
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const toggle = () => {
    setOpen(!open);
  };

  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting, isError }] = useDeleteUserMutation();

  const handleEdit = (id) => {
    setUserId(id);
    toggle();
    console.log('Edit clicked for userId:', id);
  };

  const handleDelete = (ids) => {
    console.log({ ids });

    const deletePromises = ids.map((id) =>
      deleteUser(id)
        .unwrap()
        .then((deletedUserId) => {
          console.log(`User with ID ${deletedUserId} deleted successfully`);
          return deletedUserId;
        }),
    );

    Promise.all(deletePromises)
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error('Failed to delete users:', error);
      });
  };

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [dispatch, users]);

  const headers = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    // Add other user attributes as needed
  ];

  if (isLoading || isDeleting) return <h1>Loading</h1>;

  return (
    <PageContainer title="Users" description="This is the Users Page">
      <Breadcrumb title={'Users'} items={BCrumb} />
      <Box>
        <TableLayout
          headers={headers}
          rows={users ?? []}
          handleSearch={(event) => console.log('Search:', event.target.value)}
          search=""
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Users'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          renderButton={
            <Box>
              <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                Add New User
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
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => handleDelete([row.id])}>
                  <Delete size="1.1rem" />
                </IconButton>
              </Tooltip>
            </>
          )}
        />
      </Box>
      <UserDialog open={open} setOpen={setOpen} toggle={toggle} userId={userId} refetch={refetch} />
    </PageContainer>
  );
};

export default UsersPage;
