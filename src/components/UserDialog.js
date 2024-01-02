import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateUserMutation, useUpdateUserMutation } from 'src/store/api/usersApi'; // Update with the correct import path
import CustomFormLabel from './forms/theme-elements/CustomFormLabel';
import CustomSelect from './forms/theme-elements/CustomSelect';
import CustomTextField from './forms/theme-elements/CustomTextField';

const UserDialog = ({ userId, open, setOpen, toggle, refetch }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [createUserMutation] = useCreateUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const isEditMode = !!userId;

  const initialFormData = {
    userName: '',
    email: '',
    phoneNumber: '',
    designation: '',
    franchiseName: '',
    centerNumber: '',
    secondaryNumber: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    address: '',
    password: '',
    userStatus: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && userId) {
      const user = users.find((user) => user.id === userId);

      if (user) {
        setFormData({
          ...user,
          userStatus: user.status, // Assuming status is stored as userStatus in formData
        });
      }
    }
  }, [isEditMode, userId, users]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ formData });

    if (isEditMode) {
      await updateUserMutation({ userId, updatedUserData: formData });
    } else {
      await createUserMutation(formData);
    }
    refetch();
    toggle();
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      maxWidth="md"
      fullWidth
      aria-labelledby="user-dialog-title"
      aria-describedby="user-dialog-description"
    >
      <DialogTitle id="user-dialog-title" variant="h5">
        {isEditMode ? 'Update User' : 'Create New User'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="user-dialog-description">
          {isEditMode
            ? 'Update the details for the user.'
            : 'Fill in all the fields and click on the submit button to create a new user.'}
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="userName" sx={{ mt: 0 }}>
                  User Name
                </CustomFormLabel>
                <CustomTextField
                  id="userName"
                  variant="outlined"
                  fullWidth
                  value={formData.userName}
                  onChange={(e) => handleChange('userName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="email" sx={{ mt: 0 }}>
                  Email
                </CustomFormLabel>
                <CustomTextField
                  id="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="phoneNumber" sx={{ mt: 0 }}>
                  Phone Number
                </CustomFormLabel>
                <CustomTextField
                  id="phoneNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="password" sx={{ mt: 0 }}>
                  Password
                </CustomFormLabel>
                <CustomTextField
                  id="password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="userStatus" sx={{ mt: 0 }}>
                  User Status
                </CustomFormLabel>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="userStatus"
                    value={formData.userStatus}
                    onChange={(e) => handleChange('userStatus', e.target.value)}
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>

              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  type="submit"
                  disabled={createUserMutation.isLoading || updateUserMutation.isLoading}
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </Button>
                <Button variant="contained" color="error" onClick={toggle}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
