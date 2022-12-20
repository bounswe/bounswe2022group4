import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { BackendApi } from '../../api';

const ReportPost = ({ setOpenReportModal }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpenReportModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id='body'
          label='Report'
          multiline
          rows={4}
          rowsMax='4'
          margin='normal'
          style={{ width: '100%' }}
        />

        <br />
        <br />

        <Button type='submit' variant='outlined'>
          Report Post
        </Button>
      </form>
      <br />
    </div>
  );
};

export default ReportPost;
