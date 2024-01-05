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
import { useCreateCategoryMutation, useUpdateCategoryMutation } from 'src/store/api/categoryApi';
import CustomFormLabel from './forms/theme-elements/CustomFormLabel';
import CustomSelect from './forms/theme-elements/CustomSelect';
import CustomTextField from './forms/theme-elements/CustomTextField';

const CategoryDialog = ({ categoryId, open, setOpen, toggle, refetch, subjectId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category?.categories);
  console.log('categories', categories);

  const [createCategoryMutation] = useCreateCategoryMutation();
  const [updateCategoryMutation] = useUpdateCategoryMutation();

  const isEditMode = !!categoryId;

  const initialFormData = {
    name: '',
    level: '',
    status: 'Active',
    description: '',
    subjectId: subjectId,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && categoryId) {
      const category = categories?.find((category) => category.id === categoryId);
      if (category) {
        setFormData({
          name: category.name,
          level: category.level,
          status: category.status,
          description: category.description,
          subjectId: category.subjectId,
        });
      }
    }
  }, [isEditMode, categoryId, categories]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ formData });

    const categoryData = {
      name: formData.name,
      level: formData.level,
      status: formData.status,
      description: formData.description,
      subjectId: formData.subjectId,
    };

    if (isEditMode) {
      await updateCategoryMutation({ id: categoryId, updatedCategoryData: categoryData });
    } else {
      await createCategoryMutation(categoryData);
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
      aria-labelledby="category-dialog-title"
      aria-describedby="category-dialog-description"
    >
      <DialogTitle id="category-dialog-title" variant="h5">
        {isEditMode ? 'Update Category' : 'Create New Category'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="category-dialog-description">
          {isEditMode
            ? 'Update the details for the category.'
            : 'Fill in all the fields and click on the submit button to create a new category.'}
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="name" sx={{ mt: 0 }}>
                  Category Name
                </CustomFormLabel>
                <CustomTextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="level" sx={{ mt: 0 }}>
                  Select Level
                </CustomFormLabel>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="level"
                    value={formData.status}
                    onChange={(e) => handleChange('level', e.target.value)}
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="Active">Level 1</MenuItem>
                    <MenuItem value="Inactive">Level 2</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="status" sx={{ mt: 0 }}>
                  Active
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
                <CustomFormLabel htmlFor="description" sx={{ mt: 0 }}>
                  Description
                </CustomFormLabel>
                <CustomTextField
                  id="description"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  type="submit"
                  disabled={createCategoryMutation.isLoading || updateCategoryMutation.isLoading}
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

export default CategoryDialog;
