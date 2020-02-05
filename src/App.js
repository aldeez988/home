import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories'
import Tasks from './Tasks';

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const updateUserQuery = event => {
    console.log('userQuery', userQuery);
    setUserQuery(event.target.value);
  }
  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  }
  const handleKeyPress = event => {
    if(event.key ==='Enter'){
    searchQuery();
    }
  }
  return (
    <div className="App">
      <h1>Hello Aldeez</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress}/>
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr/>
      <Joke/>
      <hr/>
      <Tasks/>
      <hr/>
      <Stories/>
    </div>
  );
}

export default App;
