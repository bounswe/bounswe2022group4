import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const CreateComment = () => {
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-multiline-static'
          label='Comment'
          multiline
          rows={4}
          rowsMax='4'
          margin='normal'
          style={{ width: '100%' }}
          onChange={(e) => setBody(e.target.value)}
        />

        <br />
        <br />

        <Button type='submit' variant='outlined'>
          Comment
        </Button>
      </form>
      <br />
    </div>
  );
};

export default CreateComment;
