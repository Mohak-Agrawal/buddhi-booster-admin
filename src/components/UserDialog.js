import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateUserMutation, useUpdateUserMutation } from 'src/store/api/usersApi'; // Update with the correct import path
import CustomFormLabel from './forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from './forms/theme-elements/CustomOutlinedInput';
import CustomSelect from './forms/theme-elements/CustomSelect';
import CustomSwitch from './forms/theme-elements/CustomSwitch';
import CustomTextField from './forms/theme-elements/CustomTextField';

const UserDialog = ({ userId, open, setOpen, toggle, refetch }) => {
  console.log('userId', userId);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const franchises = useSelector((state) => state.franchises.franchises);
  const user = useSelector((state) => state.auth.user);
  const allLevels = useSelector((state) => {
    const subjectNamesToFilter = ['Vedic Maths', 'Abacus'];

    return subjectNamesToFilter.reduce((result, subjectName) => {
      const subject = state.subjects.subjects.find((subject) => subject.name === subjectName);

      result.push({
        subjectName,
        levels: subject
          ? state.levels.levels.filter((level) => level.subjectId === subject.id)
          : [],
      });

      return result;
    }, []);
  });

  const { vedicMathsLevels, abacusLevels } = allLevels.reduce(
    (result, subjectLevels) => {
      if (subjectLevels.subjectName === 'Vedic Maths') {
        result.vedicMathsLevels.push(...subjectLevels.levels);
      } else if (subjectLevels.subjectName === 'Abacus') {
        result.abacusLevels.push(...subjectLevels.levels);
      }
      return result;
    },
    { vedicMathsLevels: [], abacusLevels: [] },
  );

  const [createUserMutation] = useCreateUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const handleToggle = (setter) => {
    setter((prev) => !prev);
  };

  const isEditMode = !!userId;

  console.log({ franchises });

  const initialFormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    franchiseId: '',
    secondaryNumber: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    address: '',
    password: '',
    vedicMathsEnrollment: false,
    vedicMathsLevel: '',
    abacusEnrollment: false,
    abacusLevel: '',
    userStatus: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && userId) {
      const user = users.find((user) => user.id === userId);

      console.log('user', user);

      if (user) {
        setFormData({
          ...user,
          confirmPassword: user.password,
          userStatus: user.userStatus, // Assuming status is stored as userStatus in formData
        });
      }
    }
  }, [isEditMode, userId, users]);

  const handleChange = (field, value) => {
    if (field === 'fullName') {
      const firstName = value.split(' ')[0].toLowerCase();
      const generatedEmail = `${firstName}${Math.floor(Math.random() * 10000)}@buddhibooster.com`;

      // Generate a miscellaneous strong 10-digit password
      const generatedPassword = Math.random()
        .toString(36)
        .slice(2, 12)
        .replace(/[a-z]/g, (c) => (Math.random() > 0.5 ? c.toUpperCase() : c));

      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
        email: generatedEmail,
        password: generatedPassword,
        confirmPassword: generatedPassword,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log('Password and Confirm Password do not match');
      return;
    }

    console.log('formData', formData);

    if (isEditMode) {
      try {
        await updateUserMutation({ userId, updatedUser: formData });
        console.log('User updated successfully');
      } catch (updateError) {
        console.error('Error updating user:', updateError);
        // Handle update error, you might want to show a notification or take other actions
      }
    } else {
      try {
        await createUserMutation({ ...formData, confirmPassword: undefined });
        console.log('User created successfully');
      } catch (createError) {
        console.error('Error creating user:', createError);
        // Handle create error, you might want to show a notification or take other actions
      }
    }

    refetch();
    handleClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => handleToggle(setShowPassword);
  const handleClickShowConfirmPassword = () => handleToggle(setShowConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let matchedFranchise;

  if (franchises) {
    matchedFranchise = franchises.find((franchise) => franchise.id === user.franchiseId);
  }

  console.log({ matchedFranchise });

  const handleAbacusToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      abacusEnrollment: !prevData.abacusEnrollment,
    }));
  };
  const handleVedicMathsToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      vedicMathsEnrollment: !prevData.vedicMathsEnrollment,
    }));
  };

  const handleClose = () => {
    // Reset the form data when the dialog is dismissed

    setFormData(initialFormData);
    // Close the dialog
    toggle();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
                <CustomFormLabel htmlFor="fullName" sx={{ mt: 0 }}>
                  Full Name *
                </CustomFormLabel>
                <CustomTextField
                  id="fullName"
                  variant="outlined"
                  fullWidth
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="email" sx={{ mt: 0 }}>
                  Email*
                </CustomFormLabel>
                <CustomTextField
                  required
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

              {matchedFranchise ? (
                <></>
              ) : (
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="franchiseId" sx={{ mt: 0 }}>
                    Franchise Name*
                  </CustomFormLabel>
                  <FormControl fullWidth variant="outlined">
                    <CustomSelect
                      required
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
                <CustomFormLabel htmlFor="password" sx={{ mt: 0 }}>
                  Password*
                </CustomFormLabel>
                <CustomOutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  id="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="confirmPassword" sx={{ mt: 0 }}>
                  Confirm Password*
                </CustomFormLabel>
                <CustomOutlinedInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  id="confirmPassword"
                  variant="outlined"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomFormLabel htmlFor="secondaryNumber" sx={{ mt: 0 }}>
                    Vedic Maths Enrollment
                  </CustomFormLabel>
                  <CustomSwitch
                    checked={formData.vedicMathsEnrollment}
                    onChange={handleVedicMathsToggle}
                  />
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="vedicMathsLevel"
                    value={formData.vedicMathsLevel}
                    onChange={(e) => handleChange('vedicMathsLevel', e.target.value)}
                    fullWidth
                    variant="outlined"
                    disabled={!formData.vedicMathsEnrollment}
                  >
                    {vedicMathsLevels
                      .sort((a, b) => a.sNo - b.sNo)
                      .map((item, index) => (
                        <MenuItem value={item.name} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomFormLabel htmlFor="secondaryNumber" sx={{ mt: 0 }}>
                    Abacus Enrollment
                  </CustomFormLabel>
                  <CustomSwitch checked={formData.abacusEnrollment} onChange={handleAbacusToggle} />
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="abacusLevel"
                    value={formData.abacusLevel}
                    onChange={(e) => handleChange('abacusLevel', e.target.value)}
                    fullWidth
                    variant="outlined"
                    disabled={!formData.abacusEnrollment}
                  >
                    {abacusLevels
                      .sort((a, b) => a.sNo - b.sNo)
                      .map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                </FormControl>
              </Grid>

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
                <CustomFormLabel htmlFor="pincode" sx={{ mt: 0 }}>
                  Pincode
                </CustomFormLabel>
                <CustomTextField
                  id="pincode"
                  variant="outlined"
                  fullWidth
                  value={formData.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
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
                <Button variant="contained" color="error" onClick={handleClose}>
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
