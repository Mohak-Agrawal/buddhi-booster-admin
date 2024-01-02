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
import {
  useCreateFranchiseMutation,
  useUpdateFranchiseMutation,
} from 'src/store/api/franchisesApi';
import CustomFormLabel from './forms/theme-elements/CustomFormLabel';
import CustomSelect from './forms/theme-elements/CustomSelect';
import CustomTextField from './forms/theme-elements/CustomTextField';

const FranchiseDialog = ({ franchiseId, open, setOpen, toggle, refetch }) => {
  const dispatch = useDispatch();
  const franchises = useSelector((state) => state.franchises?.franchises);
  const subjects = useSelector((state) => state.subjects.subjects);

  const [createFranchiseMutation] = useCreateFranchiseMutation();
  const [updateFranchiseMutation] = useUpdateFranchiseMutation();

  const isEditMode = !!franchiseId;

  const initialFormData = {
    franchiseName: '',
    description: '',
    address: '',
    centerNumber: '',
    city: '',
    country: '',
    email: '',
    phoneNumber: '',
    pinCode: '',
    secondaryNumber: '',
    state: '',
    userName: '',
    password: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && franchiseId) {
      const franchise = franchises?.find((franchise) => franchise.id === franchiseId);
      console.log({ franchise });
      if (franchise) {
        setFormData({
          ...franchise,
        });
      }
    }
  }, [isEditMode, franchiseId, franchises]);

  const handleChange = (field, value) => {
    if (field === 'duration' && !Number.isInteger(Number(value))) {
      return;
    }

    if (field === 'date') {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    } else if (field === 'subjectId') {
      const subjectName = getSubjectName(value);
      setFormData((prevData) => ({ ...prevData, [field]: value, subjectName }));
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const getSubjectName = (subjectId) => {
    const selectedSubject = subjects.find((subject) => subject.id === subjectId);
    return selectedSubject ? selectedSubject.name : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ formData });

    if (isEditMode) {
      await updateFranchiseMutation({ franchiseId, updatedFranchiseData: formData });
    } else {
      await createFranchiseMutation(formData);
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
      aria-labelledby="franchise-dialog-title"
      aria-describedby="franchise-dialog-description"
    >
      <DialogTitle id="franchise-dialog-title" variant="h5">
        {isEditMode ? 'Update Franchise' : 'Create New Franchise'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="franchise-dialog-description">
          {isEditMode
            ? 'Update the details for the franchise.'
            : 'Fill in all the fields and click on the submit button to create a new franchise.'}
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="franchiseName" sx={{ mt: 0 }}>
                  Franchise Name
                </CustomFormLabel>
                <CustomTextField
                  id="franchiseName"
                  variant="outlined"
                  fullWidth
                  value={formData.franchiseName}
                  onChange={(e) => handleChange('franchiseName', e.target.value)}
                />
              </Grid>
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
                <CustomFormLabel htmlFor="centerNumber" sx={{ mt: 0 }}>
                  Center Number
                </CustomFormLabel>
                <CustomTextField
                  id="centerNumber"
                  variant="outlined"
                  fullWidth
                  value={formData.centerNumber}
                  onChange={(e) => handleChange('centerNumber', e.target.value)}
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
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="address" sx={{ mt: 0 }}>
                  Address
                </CustomFormLabel>
                <CustomTextField
                  id="address"
                  variant="outlined"
                  fullWidth
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
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
                <CustomFormLabel htmlFor="status" sx={{ mt: 0 }}>
                  Status
                </CustomFormLabel>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
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
                  disabled={createFranchiseMutation.isLoading || updateFranchiseMutation.isLoading}
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

export default FranchiseDialog;
