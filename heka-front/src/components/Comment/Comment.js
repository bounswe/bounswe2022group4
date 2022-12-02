import React, { useState } from 'react';
import { Divider, Grid, Paper, Button } from '@material-ui/core';
import { Delete, Edit } from '@mui/icons-material';

const Comment = ({ user, content, time, index }) => {
  return (
    <Paper style={{ padding: '40px 20px', marginTop: 40 }}>
      <Grid container wrap='nowrap' spacing={2}>
        <Grid item xs zeroMinWidth style={{ justifyContent: 'left' }}>
          <h4 style={{ marginTop: '5vh', textAlign: 'left', color: 'grey' }}>
            {user}
          </h4>
          <p style={{ textAlign: 'left' }}>{content}</p>
          <p style={{ textAlign: 'left', color: 'gray' }}>posted at {time}</p>
        </Grid>
      </Grid>
      <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
      <div className='post-footer-container'>
        <div
          style={{
            display: 'flex',
            gap: '2vh',
          }}
        ></div>

        <div
          style={{
            display: 'flex',
            gap: '2vh',
          }}
        >
          <Button
            variant='outlined'
            startIcon={<Delete />}
            onClick={() => {
              alert(
                'Delete functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
            data-testid={'delete-button-' + index}
          >
            Delete
          </Button>
          <Button
            variant='outlined'
            startIcon={<Edit />}
            onClick={() => {
              alert(
                'Edit functionality not implemented yet and will be available only for admins and the user who created the post'
              );
            }}
            data-testid={'edit-button-' + index}
          >
            Edit
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default Comment;
