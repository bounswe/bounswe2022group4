import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { BackendApi } from '../../api';

const CreateComment = ({
  slug,
  authenticationToken,
  setOpenCreateCommentModal,
  changeInComments,
  setChangeInComments,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      body: event.target.body.value,
    };
    const response = await BackendApi.postCreateComment(
      data.body,
      slug,
      authenticationToken
    );

    console.log(data.body, response);
    setOpenCreateCommentModal(false);
    setChangeInComments(!changeInComments);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id='body'
          label='Comment'
          multiline
          rows={4}
          rowsMax='4'
          margin='normal'
          style={{ width: '100%' }}
          // onChange={(e) => setBody(e.target.value)}
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
