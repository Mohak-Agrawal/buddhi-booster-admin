import { Edit, InsertChart, ManageAccounts } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import TableLayout from 'src/components/TableLayout';
import UserDialog from 'src/components/UserDialog'; // Assuming you have a UserDialog component
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { useGetFranchisesQuery } from 'src/store/api/franchisesApi';
import { useGetLevelsQuery } from 'src/store/api/levelsApi';
import { useGetSubjectsQuery } from 'src/store/api/subjectsApi';
import { useDeleteUserMutation, useGetUsersQuery } from 'src/store/api/usersApi';
import { setFranchises } from 'src/store/slices/franchiseSlice';
import { setLevels } from 'src/store/slices/levelsSlice';
import { setUsers } from 'src/store/slices/userSlice';

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
  const {
    data: franchises,
    error: franchiseError,
    isLoading: isFranchiseLoading,
  } = useGetFranchisesQuery();

  const {
    data: subjects,
    error: subjectError,
    isLoading: isSubjectLoading,
  } = useGetSubjectsQuery();

  const { data: levels } = useGetLevelsQuery();

  console.log('subjects', subjects);

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
    if (levels) {
      dispatch(setLevels(levels));
    }
  }, [dispatch, levels]);

  useEffect(() => {
    if (franchises) {
      dispatch(setFranchises(franchises));
    }
  }, [dispatch, franchises]);

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [dispatch, users]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userStatus.toLowerCase().includes(searchTerm.toLowerCase()),
        // Add other fields as needed
      )
    : [];

  const headers = [
    { id: 'fullName', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    // { id: 'franchiseId', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number' },
    { id: 'userStatus', numeric: false, disablePadding: false, label: 'User Status' },
    // Add other user attributes as needed
  ];

  const csvData = users
    ? users.map((user) => ({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      }))
    : [];

  if (isLoading || isDeleting || isFranchiseLoading) return <h1>Loading</h1>;

  return (
    <PageContainer title="Users" description="This is the Users Page">
      <Breadcrumb title={'Users'} items={BCrumb} />
      <Box>
        <TableLayout
          headers={headers}
          rows={filteredUsers ?? []}
          handleSearch={(event) => setSearchTerm(event.target.value)}
          search={searchTerm}
          subjectId="yourSubjectId"
          searchPlaceholder={'Search Users'}
          navigate={(path) => console.log('Navigate to:', path)}
          handleDelete={handleDelete}
          renderButton={
            <>
              <CSVLink
                data={csvData}
                filename={`users_${new Date().toISOString()}.csv`}
                style={{ marginRight: 10 }}
              >
                <Button color="primary" variant="outlined">
                  Download Data
                </Button>
              </CSVLink>
              <Button color="primary" variant="contained" onClick={toggle}>
                Add New User
              </Button>
            </>
          }
          renderActionItems={(row) => (
            <>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => {
                    handleEdit(row.id);
                  }}
                >
                  <Edit size="1.1rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account Settings">
                <IconButton size="small" onClick={() => handleDelete([row.id])}>
                  <ManageAccounts size="1.1rem" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Student's Performance">
                <IconButton size="small" onClick={() => handleDelete([row.id])}>
                  <InsertChart size="1.1rem" />
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
