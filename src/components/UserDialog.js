import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateExamMutation, useUpdateExamMutation } from 'src/store/api/examsApi'; // Adjust the import path
import FormSeparator from './forms/form-vertical/FormSeparator';

const UserDialog = ({ examId, open, setOpen, toggle, refetch }) => {
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
        {isEditMode ? 'Update User' : 'Create New User'}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="exam-dialog-description">
          {isEditMode
            ? 'Update the details for the exam.'
            : 'Fill in all the fields and click on the submit button to create a new exam.'}
        </DialogContentText> */}
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <FormSeparator />
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
