import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  FormLabel,
  DialogContent,
  DialogContentText,
  Grid,
  Autocomplete,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../store/apps/contacts/ContactSlice';
import CustomTextField from './forms/theme-elements/CustomTextField';
import { createFranchise, updateFranchise } from 'src/store/reducers/franchiseSlice';

const FranchiseAdd = ({ subjectId, franchiseId, open, setOpen, toggle }) => {
  const dispatch = useDispatch();
  const franchises = useSelector((state) => state.franchises.franchises);

  const isEditMode = !!franchiseId;

  const initialFormData = {
    subjectId: subjectId,
    name: '',
    description: '',
    level: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && franchiseId) {
      const franchise = franchises.find((franchise) => franchise.id === franchiseId);
      if (franchise) {
        setFormData({
          subjectId: franchise.subjectId,
          name: franchise.name,
          description: franchise.description,
          level: franchise.level,
        });
      }
    }
  }, [isEditMode, franchiseId, franchises]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        open={open}
        onClose={toggle}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          {isEditMode ? 'Update Franchise' : 'Create New Franchise'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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

                <Grid item xs={12} lg={12}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="description"
                    size="small"
                    multiline
                    rows="3"
                    variant="outlined"
                    fullWidth
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                    disabled={formData.name.length === 0 || formData.description.length === 0}
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
