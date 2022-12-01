import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DropzoneArea } from 'material-ui-dropzone';
import { useGeolocated } from 'react-geolocated';

const branches = [
  'Eye Health and Diseases',
  'Anesthesia and Reanimation',
  'Cardiology',
  'Dermatology',
  'Diagnostic Radiology',
  'Ear Nose And Throat',
  'Gastroenterology',
];
const CreatePost = () => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(GOOGLE_MAPS_API_KEY);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // const user_id = context.dbProfileState[0].uid;
    // const username = context.dbProfileState[0].username;
    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      //   username: username,
      //   uid: user_id,
    };
  };
  function displayLocation(latitude, longitude) {
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url =
      'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      latitude +
      ',' +
      longitude +
      '&sensor=true' +
      '&key=' +
      GOOGLE_MAPS_API_KEY;
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        setAddress(address);
        console.log(address);
      }
    };
    request.send();
  }
  useEffect(() => {
    if (coords) {
      displayLocation(coords.latitude, coords.longitude);
    }
  }, [coords]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id='title'
          label='Title'
          margin='normal'
          style={{ width: '100%' }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          id='outlined-multiline-static'
          label='Body'
          multiline
          rows={4}
          rowsMax='4'
          margin='normal'
          style={{ width: '100%' }}
          onChange={(e) => setBody(e.target.value)}
        />

        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Category'
            onChange={(e) => setBranch(e.target.value)}
          >
            {branches.map((branch) => (
              <MenuItem value={branch}>{branch}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <DropzoneArea
          onChange={(file) => {
            setImageFile(file);
          }}
          filesLimit={1}
        />
        <br />
        <br />

        <TextField
          id='outlined-multiline-flexible'
          label='Location'
          multiline
          maxRows={4}
          style={{ width: '100%' }}
          value={
            address &&
            address.address_components[2].short_name +
              ', ' +
              address.address_components[1].short_name +
              ', ' +
              address.address_components[3].short_name +
              ', ' +
              address.address_components[4].short_name +
              ', ' +
              address.address_components[5].long_name
          }
          disabled
          //   onChange={handleChange}
        />

        <br />
        <br />

        <Button type='submit' variant='outlined'>
          Post
        </Button>
      </form>
      <br />
    </div>
  );
};

export default CreatePost;
