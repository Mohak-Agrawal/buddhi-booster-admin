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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const franchises = useSelector((state) => state.franchises.franchises);
  const user = useSelector((state) => state.auth.user);
  const allSubjects = useSelector((state) => state.subjects.subjects);
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

  console.log('Vedic Maths Levels:', vedicMathsLevels);
  console.log('Abacus Levels:', abacusLevels);

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
  const [isVedicMathsEnabled, setVedicMathsEnabled] = useState(false);
  const [isAbacusEnabled, setAbacusEnabled] = useState(false);
  const [vedicMathsLevel, setVedicMathsLevel] = useState(null);
  const [abacusLevel, setAbacusLevel] = useState(null);

  const handleVedicMathsToggle = () => {
    setVedicMathsEnabled((prev) => !prev);
  };
  const handleAbacusToggle = () => {
    setAbacusEnabled((prev) => !prev);
  };

  const isEditMode = !!userId;

  const initialFormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    franchiseId: matchedFranchise?.id,
    secondaryNumber: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
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

    // Add a check for password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      // Password and confirm password do not match, handle accordingly (display error, etc.)
      console.log('Password and Confirm Password do not match');
      return;
    }

    // Password and Confirm Password match, proceed with the form submission
    console.log({ formData });

    if (isVedicMathsEnabled) {
      // Record Vedic Maths enrollment status and level
      formData.vedicMathsEnrollment = true;
      formData.vedicMathsLevel = vedicMathsLevel;
    }

    if (isAbacusEnabled) {
      // Record Abacus enrollment status and level
      formData.abacusEnrollment = true;
      formData.abacusLevel = abacusLevel;
    }

    if (isEditMode) {
      await updateUserMutation({ userId, updatedUserData: formData });
    } else {
      // Only send the password to the server
      await createUserMutation({ ...formData, confirmPassword: undefined });
    }

    refetch();
    toggle();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Fixed state name

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show); // Fixed function name

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                <CustomFormLabel htmlFor="password" sx={{ mt: 0 }}>
                  Password
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
                  id="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="confirmPassword" sx={{ mt: 0 }}>
                  Confirm Password
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
                  <CustomSwitch checked={isVedicMathsEnabled} onChange={handleVedicMathsToggle} />
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="vedicMathsLevel"
                    value={vedicMathsLevel}
                    onChange={(e) => setVedicMathsLevel(e.target.value)}
                    fullWidth
                    variant="outlined"
                    disabled={!isVedicMathsEnabled}
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
                  <CustomSwitch checked={isAbacusEnabled} onChange={handleAbacusToggle} />
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="abacusLevel"
                    value={abacusLevel}
                    onChange={(e) => setAbacusLevel(e.target.value)}
                    fullWidth
                    variant="outlined"
                    disabled={!isAbacusEnabled}
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
