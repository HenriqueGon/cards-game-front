import React, { useState } from 'react';
import axios from 'axios';
 
import axiosInstance from '../api';

import Input from '../components/Input';

import { useNavigate } from 'react-router-dom';
import { validate } from 'uuid';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const [gameUuid, setGameUuid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateGame = async () => {
    try {
      const { data } = await axiosInstance.post('/games');
      setGameUuid(data.uuid);
      navigate(`games/${data.uuid}`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.message);
        return;
      }

      setErrorMessage('An unexpected error has accurred');
    }
  }

  const handleJoinGame = async () => {
    try {
      const { data } = await axiosInstance.get(`/games/${gameUuid}`);
      setGameUuid(data.uuid);
      navigate(`games/${gameUuid}`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.message);
        return;
      }

      setErrorMessage('An unexpected error has accurred');
    }
  }

  return (
    <div className='fullScreenContainer'>
      <div className="container card">
        <h1 style={{ textAlign: 'center' }}> Cards Game </h1>
        <p> {errorMessage} </p>
        <div className="form-group">
          <Input
            label='ID of Game (Optional)'
            className="form-control"
            id="gameUuid"
            placeholder="ID Game"
            style={{ marginBottom: '15px' }}
            value={gameUuid}
            onChange={(e) => setGameUuid(e.target.value)} />
        </div>

        <div className='text-center row'>
          <div className='col-6'>
            <Button 
              text='Create a new game'
              onClick={handleCreateGame} 
              className="btn btn-primary btn-block" />
          </div>
          <div className='col-6'>
            <Button 
              text='Enter game'
              onClick={handleJoinGame} 
              disabled={!validate(gameUuid)} 
              className="btn btn-primary btn-block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
