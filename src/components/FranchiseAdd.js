import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFranchise, updateFranchise } from 'src/store/slices/franchiseSlice';

const FranchiseAdd = ({ franchiseId }) => {
  const dispatch = useDispatch();
  const franchises = useSelector((state) => state.franchises.franchises);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const isEditMode = !!franchiseId;

  const initialFormData = {
    name: '',
    description: '',
    level: '',
    userName: '',
    email: '',
    phoneNumber: '',
    designation: '',
    centerNumber: '',
    secondaryNumber: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    address: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    if (isEditMode && franchiseId) {
      const franchise = franchises.find((franchise) => franchise.id === franchiseId);
      if (franchise) {
        setFormData({
          franchiseId: franchise.subjectId,
          name: franchise.name,
          description: franchise.description,
          level: franchise.level,
          userName: '',
          email: '',
          phoneNumber: '',
          designation: '',
          centerNumber: '',
          secondaryNumber: '',
          city: '',
          state: '',
          country: '',
          pinCode: '',
          address: '',
          password: '',
          confirmPassword: '',
        });
      }
    }
  }, [isEditMode, franchiseId, franchises]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic to dispatch the action based on isEditMode
    if (isEditMode) {
      dispatch(updateFranchise({ franchiseId, franchiseData: formData }));
    } else {
      dispatch(createFranchise(formData));
    }

    toggle();
  };

  return (
    <>
      <Box>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Franchise
        </Button>
      </Box>
      <Dialog
        open={modal}
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
                  <FormLabel>Franchise Name</FormLabel>
                  <TextField
                    id="name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Franchise Level</FormLabel>
                  <Autocomplete
                    disablePortal
                    id="level"
                    options={[
                      { label: 'Level 1', value: 1 },
                      { label: 'Level 2', value: 2 },
                      { label: 'Level 3', value: 3 },
                      { label: 'Level 4', value: 4 },
                      { label: 'Level 5', value: 5 },
                      { label: 'Level 6', value: 6 },
                    ]}
                    fullWidth
                    size="small"
                    onChange={(event, value) => setFormData({ ...formData, level: value?.value })}
                    renderInput={(params) => (
                      <TextField {...params} aria-label="Select Level" variant="outlined" />
                    )}
                  />
                </Grid>

                {/* ... (Existing fields) */}

                {/* Additional Fields */}
                <Grid item xs={12} lg={6}>
                  <FormLabel>User Name</FormLabel>
                  <TextField
                    id="userName"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField
                    id="phoneNumber"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Designation</FormLabel>
                  <TextField
                    id="designation"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Center Number</FormLabel>
                  <TextField
                    id="centerNumber"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.centerNumber}
                    onChange={(e) => setFormData({ ...formData, centerNumber: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Secondary Number</FormLabel>
                  <TextField
                    id="secondaryNumber"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.secondaryNumber}
                    onChange={(e) => setFormData({ ...formData, secondaryNumber: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>City</FormLabel>
                  <TextField
                    id="city"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>State</FormLabel>
                  <TextField
                    id="state"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Country</FormLabel>
                  <TextField
                    id="country"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Pin Code</FormLabel>
                  <TextField
                    id="pinCode"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    size="small"
                    multiline
                    rows="3"
                    variant="outlined"
                    fullWidth
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Password</FormLabel>
                  <TextField
                    id="password"
                    size="small"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Password Confirmation</FormLabel>
                  <TextField
                    id="confirmPassword"
                    size="small"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>User Status</FormLabel>
                  <FormControl fullWidth size="small" variant="outlined">
                    <InputLabel id="userStatus-label">Select User Status</InputLabel>
                    <Select
                      labelId="userStatus-label"
                      id="userStatus"
                      value={formData.userStatus}
                      onChange={(e) => setFormData({ ...formData, userStatus: e.target.value })}
                      label="Select User Status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                    disabled={!formData}
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
    </>
  );
};

export default FranchiseAdd;
