import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { BackendApi } from '../../api';

function SearchBar() {
  const [foundData, setfoundData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const handle = async (event) => {
    const searchWord = event.target.value;
    const data = [
      {
        link: 'https://en.wikipedia.org/wiki/Urology\n',
        title: 'Urology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Cardiology\n',
        title: 'Cardiology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Dermatology\n',
        title: 'Dermatology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Gastroenterology\n',
        title: 'Gastroenterology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Neurology\n',
        title: 'Neurology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Ophthalmology\n',
        title: 'Ophthalmology',
      },
      {
        link: 'https://en.wikipedia.org/wiki/Pediatrics\n',
        title: 'Pediatrics',
      },
    ];
    // const data = [];
    setWordEntered(searchWord);
    const allData = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setPosts([]);
      setUsers([]);
    } else {
      const response = await BackendApi.getSearchPost(searchWord.toLowerCase(),4);
      const response_user = await BackendApi.getSearchUser(searchWord.toLowerCase(),4);
      setPosts(response.data);
      setUsers(response_user.data);
      console.log("offff " + response.data[0].title);
      //setfoundData(allData);
    }
  };

  const clearInput = () => {
    setPosts([]);
    setUsers([]);
    setWordEntered('');
  };

  return (
    <div className='search-container'>
      <div className='searchInputs'>
        <input
          className='input1'
          type='text'
          placeholder='Search'
          value={wordEntered}
          onChange={handle}
        />
        <div className='searchIcon'>
          {posts.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id='clearBtn' onClick={clearInput} />
          )}
        </div>
      </div>
      {(posts.length > 1 || users.length > 1) && (
        <div className='dataResult'>
          {posts.slice(0, 4).map((value, key) => {
            if(value.title != null) {
              return (
              
                <a className='dataItem' href={value.link} >
                  <p>{value.title} </p>
                </a>
              );
            }
            
          })}
          {users.slice(0, 4).map((value, key) => {
            if(value.username != null) {
              return (
              
                <a className='dataItem' href={"/profile/" + value.username} >
                  <p>{value.username} </p>
                </a>
              );
            }
            
          })}

        </div>
      )}
      
    </div>
  );
}

export default SearchBar;




