import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from 'src/store/slices/categorySlice';
import CustomTextField from '../forms/theme-elements/CustomTextField';

const CategoryAdd = ({ subjectId }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.contactsReducer.contacts.length + 1);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [formData, setFormData] = useState({
    subjectId: subjectId, // Replace with the actual subject ID
    name: '',
    description: '',
    level: '',
  });

  const handleSubmit = (e) => {
    console.log({ formData });
    e.preventDefault();
    dispatch(createCategory(formData));
    setModal(!modal);
  };

  return (
    <>
      <Box>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Category
        </Button>
      </Box>
      <Dialog
        open={modal}
        onClose={toggle}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          {'       Add New Category'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lets add new contact for your application. fill the all field and
            <br /> click on submit button.
          </DialogContentText>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Category Name</FormLabel>
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
                  <FormLabel>Category Level</FormLabel>
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
                      <CustomTextField
                        {...params}
                        // placeholder="Select movie"
                        aria-label="Select Level"
                      />
                    )}
                  />
                  {/* <TextField
                    id="lastname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  /> */}
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
                    Submit
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

export default CategoryAdd;
