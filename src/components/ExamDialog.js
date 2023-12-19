import {
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
import { useCreateExamMutation, useUpdateExamMutation } from 'src/store/api/examsApi'; // Adjust the import path

const ExamDialog = ({ examId, open, setOpen, toggle, refetch }) => {
  console.log({ examId });
  const dispatch = useDispatch();
  const states = useSelector((state) => state);
  const exams = useSelector((state) => state.exams.exams);

  const [createExamMutation] = useCreateExamMutation(); // Mutation hook for creating an exam
  const [updateExamMutation] = useUpdateExamMutation(); // Mutation hook for updating an exam

  const isEditMode = !!examId;

  const initialFormData = {
    examName: '',
    date: '',
    duration: '',
    studentsRegistered: '',
    examFees: '',
    status: 'Active',
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && examId) {
      const exam = exams.find((exam) => exam.id === examId);
      if (exam) {
        setFormData({
          examName: exam.examName,
          date: exam.date,
          duration: exam.duration,
          studentsRegistered: exam.studentsRegistered,
          examFees: exam.examFees,
          status: exam.status,
        });
      }
    }
  }, [isEditMode, examId, exams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the action based on isEditMode
    if (isEditMode) {
      await updateExamMutation({ examId, updatedExamData: formData });
    } else {
      await createExamMutation(formData);
    }
    refetch();
    toggle(); // Close the dialog
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
                <FormLabel>Exam Name</FormLabel>
                <TextField
                  id="examName"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={formData.examName}
                  onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Date</FormLabel>
                <TextField
                  id="date"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Duration</FormLabel>
                <TextField
                  id="duration"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Students Registered</FormLabel>
                <TextField
                  id="studentsRegistered"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={formData.studentsRegistered}
                  onChange={(e) => setFormData({ ...formData, studentsRegistered: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Exam Fees</FormLabel>
                <TextField
                  id="examFees"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={formData.examFees}
                  onChange={(e) => setFormData({ ...formData, examFees: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Status</FormLabel>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="status-label">Select Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    label="Select Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
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
