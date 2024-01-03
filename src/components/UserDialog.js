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

  const franchises = useSelector((state) => state.franchises.franchises);
  const user = useSelector((state) => state.auth.user);
  const matchedFranchise = franchises.find(
    (franchise) => franchise.franchiseName === user.franchiseName,
  );

  if (matchedFranchise) {
    // Do something with the matched franchise
    console.log('Found franchise:', matchedFranchise);
  } else {
    // No franchise found with the given franchiseName
    console.log('Franchise not found');
  }

  const [createUserMutation] = useCreateUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const isEditMode = !!userId;

  const initialFormData = {
    userName: '',
    email: '',
    phoneNumber: '',
    designation: '',
    franchiseId: matchedFranchise?.id,
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
                <CustomFormLabel htmlFor="designation" sx={{ mt: 0 }}>
                  Designation
                </CustomFormLabel>
                <CustomTextField
                  id="designation"
                  variant="outlined"
                  fullWidth
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                />
              </Grid>

              {matchedFranchise ? (
                <></>
              ) : (
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="franchiseId" sx={{ mt: 0 }}>
                    Franchise Name
                  </CustomFormLabel>
                  <FormControl fullWidth variant="outlined">
                    <CustomSelect
                      id="franchiseId"
                      value={formData.franchiseId}
                      onChange={(e) => handleChange('franchiseId', e.target.value)}
                      fullWidth
                      variant="outlined"
                    >
                      {franchises?.map((item, index) => (
                        <MenuItem value={item.id} key={index}>
                          {item.franchiseName}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="secondaryNumber" sx={{ mt: 0 }}>
                  Secondary Number
                </CustomFormLabel>
                <CustomTextField
                  id="secondaryNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.secondaryNumber}
                  onChange={(e) => handleChange('secondaryNumber', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="city" sx={{ mt: 0 }}>
                  City
                </CustomFormLabel>
                <CustomTextField
                  id="city"
                  variant="outlined"
                  fullWidth
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="state" sx={{ mt: 0 }}>
                  State
                </CustomFormLabel>
                <CustomTextField
                  id="state"
                  variant="outlined"
                  fullWidth
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="country" sx={{ mt: 0 }}>
                  Country
                </CustomFormLabel>
                <CustomTextField
                  id="country"
                  variant="outlined"
                  fullWidth
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="pinCode" sx={{ mt: 0 }}>
                  Pin Code
                </CustomFormLabel>
                <CustomTextField
                  id="pinCode"
                  variant="outlined"
                  fullWidth
                  value={formData.pinCode}
                  onChange={(e) => handleChange('pinCode', e.target.value)}
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
                <CustomFormLabel htmlFor="address" sx={{ mt: 0 }}>
                  Address
                </CustomFormLabel>
                <CustomTextField
                  id="address"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
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
