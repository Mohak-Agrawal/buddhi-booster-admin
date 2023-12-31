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
import { useCreateExamMutation, useUpdateExamMutation } from 'src/store/api/examsApi';
import CustomFormLabel from './forms/theme-elements/CustomFormLabel';
import CustomSelect from './forms/theme-elements/CustomSelect';
import CustomTextField from './forms/theme-elements/CustomTextField';

const ExamDialog = ({ examId, open, setOpen, toggle, refetch }) => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  const subjects = useSelector((state) => state.subject.subjects);
  console.log('state', subjects);

  const [createExamMutation] = useCreateExamMutation();
  const [updateExamMutation] = useUpdateExamMutation();

  const isEditMode = !!examId;

  const initialFormData = {
    examName: '',
    date: new Date().toISOString().split('T')[0], // Initialize with the current date
    duration: '',
    subjectId: '',
    examFees: '',
    description: '', // Add the description field
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && examId) {
      const exam = exams.find((exam) => exam.id === examId);

      if (exam) {
        setFormData({
          ...exam,
          date: exam.date.split('T')[0],
          subjectName: getSubjectName(exam.subjectId),
        });
      }
    }
  }, [isEditMode, examId, exams]);

  const handleChange = (field, value) => {
    // Ensure only integer values are allowed for the 'duration' field
    if (field === 'duration' && !Number.isInteger(Number(value))) {
      return;
    }

    if (field === 'date') {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    } else if (field === 'subjectId') {
      // Set the subject name based on the selected subject ID
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
      await updateExamMutation({ examId, updatedExamData: formData });
    } else {
      await createExamMutation(formData);
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
      aria-labelledby="exam-dialog-title"
      aria-describedby="exam-dialog-description"
    >
      <DialogTitle id="exam-dialog-title" variant="h5">
        {isEditMode ? 'Update Exam' : 'Create New Exam'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="exam-dialog-description">
          {isEditMode
            ? 'Update the details for the exam.'
            : 'Fill in all the fields and click on the submit button to create a new exam.'}
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="examName" sx={{ mt: 0 }}>
                  Exam Name
                </CustomFormLabel>
                <CustomTextField
                  id="examName"
                  variant="outlined"
                  fullWidth
                  value={formData.examName}
                  onChange={(e) => handleChange('examName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="fs-date" sx={{ mt: 0 }}>
                  Exam Date
                </CustomFormLabel>
                <CustomTextField
                  type="date"
                  id="fs-date"
                  fullWidth
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="duration" sx={{ mt: 0 }}>
                  Duration (hours)
                </CustomFormLabel>
                <CustomTextField
                  id="duration"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="status" sx={{ mt: 0 }}>
                  Subject
                </CustomFormLabel>
                <FormControl fullWidth variant="outlined">
                  <CustomSelect
                    id="subjectId"
                    value={formData.subjectId}
                    onChange={(e) => handleChange('subjectId', e.target.value)}
                    fullWidth
                    variant="outlined"
                  >
                    {subjects.map((item, index) => (
                      <MenuItem value={item.id} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
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
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="examFees" sx={{ mt: 0 }}>
                  Exam Fees
                </CustomFormLabel>
                <CustomTextField
                  id="examFees"
                  variant="outlined"
                  fullWidth
                  value={formData.examFees}
                  onChange={(e) => handleChange('examFees', e.target.value)}
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
                  disabled={createExamMutation.isLoading || updateExamMutation.isLoading}
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

export default ExamDialog;
