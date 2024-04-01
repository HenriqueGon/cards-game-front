import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import axiosInstance from '../api';

import Button from '../components/Button';

import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';

const Game = () => {
  const navigate = useNavigate();

  const [game, setGame] = useState({});
  const [playingCards, setPlayingCards] = useState({});
  const [player, setPlayers] = useState({});

  const { uuid } = useParams();

  useEffect(() => {
    getGame();
  }, []);

  const getGame = async () => {
    try {
      const {
        data,
        status
      } = await axiosInstance.get(`/games/${uuid}`);

      if (status !== 200)
        navigate('/');

      setGame(data);
    } catch (err) {
      navigate('/');
    }
  }

  const getPlayers = async () => {
    try {
      const { data } = await axiosInstance.get(`/games/${uuid}/players`);
      setPlayers(data);
    } catch (err) {
      console.log('err:', err);
    }
  }

  const addDeck = async () => {
    try {
      await axiosInstance.post(`/games/${uuid}/decks`);
    } catch (err) {
      console.log(err);
    }
  }

  const getCards = async () => {
    try {
      const { data } = await axiosInstance.get(`/players/${player.id}/cards`);
      setPlayingCards(data);
    } catch (err) {
      console.log('err:', err);
    }
  }

  const dealCard = async () => {
    try {
      await axiosInstance.post(`/games/${uuid}/deal-cards`, {
        player_id: player.id,
      });
    } catch (err) {
      console.log(err);
    }

    await getCards();
  }

  const GameHeader = () => {
    return (
      <div className='row'>
        <div className='col-6'>
          <h5 style={{ color: '#fff' }}> GAME ID: {uuid} </h5>
        </div>
        <div className='col-6'>
          <div style={{ textAlign: 'right', margin: '10px' }}>
            <Button text='Add deck' onClick={addDeck} />
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='full-screen-game-container'>
      <GameHeader />

    </div>
  );
}

export default Game;
