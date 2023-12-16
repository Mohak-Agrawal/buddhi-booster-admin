// import React from 'react';
// import { Typography, Grid, Paper } from '@mui/material';

// const QuestionView = ({ questions }) => {
//   return (
//     <Grid container justifyContent="center">
//       {questions.map((question, index) => (
//         <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
//           <Paper
//             elevation={0}
//             style={{
//               padding: '20px',
//               textAlign: 'center',
//               borderWidth: '5px',
//               borderColor: 'gray',
//             }}
//           >
//             <Typography variant="body2" gutterBottom style={{ marginBottom: '10px' }}>
//               Question {index + 1}:
//             </Typography>

//             {/* Display the question format */}
//             <Typography variant="h6" style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>
//               {question.format}
//             </Typography>

//             {/* Display the answer */}
//             <Typography variant="h6" color="primary">
//               Answer: {question.answer}
//             </Typography>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default QuestionView;

import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const QuestionView = ({ questions }) => {
  console.log('first', questions);
  const calculateAnswer = (format) => {
    return format.reduce((result, value) => {
      const num = parseInt(value, 10) || 0;
      return result + num;
    }, 0);
  };
  return (
    <Grid container spacing={0} style={{ width: '100%', border: '1px solid #ddd' }}>
      {questions?.map(({ question }, index) => (
        <Grid item key={index} lg={1.5} md={2} sm={3} xs={4}>
          <Paper
            elevation={3}
            style={{
              padding: '15px',
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: 0,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="caption" gutterBottom>
              Question {index + 1}:
            </Typography>

            {/* Display the question format */}
            <Typography
              variant="h6"
              style={{ marginBottom: '20px', textAlign: 'end', alignSelf: 'center' }}
            >
              {question?.map((part, partIndex) => (
                <div key={partIndex} style={{ marginBottom: '5px' }}>
                  {part}
                </div>
              ))}
            </Typography>

            {/* Display the answer */}
            <Typography variant="subtitle1" color="primary">
              Answer: {calculateAnswer(question)}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionView;
