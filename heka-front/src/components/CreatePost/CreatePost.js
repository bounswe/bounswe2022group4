import React, { useEffect, useState } from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
} from '@material-ui/core';
// import { DropzoneArea } from 'material-ui-dropzone';
import { useGeolocated } from 'react-geolocated';
import { BackendApi } from '../../api';
import ReactImageFileToBase64 from 'react-file-image-to-base64';

const branches = [
  'Eye Health and Diseases',
  'Anesthesia and Reanimation',
  'Cardiology',
  'Dermatology',
  'Diagnostic Radiology',
  'Ear Nose And Throat',
  'Gastroenterology',
  'Orthopedics',
  'Neurology',
];
const CreatePost = ({
  authenticationToken,
  setOpenPostModal,
  changeInPost,
  setChangeInPost,
}) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAdE1vezoFkCG_xkxENjDX5DVQj3Z0woUw';
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  const [imageText, setImageText] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleOnCompleted = (file) => {
    setImageText(file[0].base64_file);
    setImageName(file[0].file_name);
    console.log(imageText);
  };
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      category: branch,
      image: imageText,
      location: address,
    };

    // console.log(ApiInstance, authenticationToken);
    const response = await BackendApi.postCreatePost(
      data.title,
      data.body,
      data.category,
      data.image,
      data.location,
      authenticationToken
    );
    console.log(isLoading);

    console.log(data.title, data.body, response);
    setChangeInPost(!changeInPost);
    setOpenPostModal(false);
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
        setAddress(
          address.address_components[2].short_name +
            ', ' +
            address.address_components[1].short_name +
            ', ' +
            address.address_components[3].short_name +
            ', ' +
            address.address_components[4].short_name +
            ', ' +
            address.address_components[5].long_name
        );
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
          required
          // onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          id='body'
          label='Body'
          multiline
          rows={4}
          rowsMax='4'
          margin='normal'
          style={{ width: '100%' }}
          required
          // onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='category'
            label='Category'
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            {branches.map((branch) => (
              <MenuItem value={branch}>{branch}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <div
          style={{
            width: '50vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ReactImageFileToBase64
            onCompleted={handleOnCompleted}
            preferredButtonText='Upload an Image'
          />
          <div style={{ marginLeft: '2vw' }}>{imageName && imageName}</div>
        </div>
        <br />
        <br />
        <TextField
          id='outlined-multiline-flexible'
          label='Location'
          multiline
          maxRows={4}
          style={{ width: '100%' }}
          value={address && address}
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
