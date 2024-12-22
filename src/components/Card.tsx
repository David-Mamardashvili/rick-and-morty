import React from 'react';
import styled, { css } from 'styled-components';
import globalStore from '../store/globalStore';
import { CardProps } from '../types/types';
import { ReactComponent as LikeIcon } from '../assets/like-icon.svg';

export const Card: React.FC<CardProps> = ({ gender, id, image, name }) => {
  const { characters, setSelectedCharacter, toggleLikeCharacter } =
    globalStore();

  const character = characters.find((character) => character.id === id);
  const isLiked = character?.isLiked || false;

  const handleClick = () => {
    const selected = characters.find((character) => character.id === id);
    setSelectedCharacter(selected || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLikeCharacter(id);
  };

  return (
    <CardContainer
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      gender={gender}
      tabIndex={0}
    >
      <CardImage src={image} alt={name} />
      <CardInfo>
        <CardName>
          <span>{name}</span>
        </CardName>
        <CardLikeButton onClick={handleLikeClick}>
          <CardLikeButtonIcon isLiked={isLiked} />
        </CardLikeButton>
      </CardInfo>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ gender?: string }>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  font-size: 15px;
  overflow: hidden;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
    ${({ gender }) => {
      switch (gender) {
        case 'Male':
          return css`
            color: #00afc7;
          `;
        case 'Female':
          return css`
            color: #ffc0cb;
          `;
        default:
          return css`
            color: #83bf46;
          `;
      }
    }}
  }

  &:focus {
    outline: 2px solid #00afc7;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const CardInfo = styled.div`
  padding: 20px;
`;

const CardName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardLikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 23px;
  width: 23px;
  border: none;
  background: none;
  cursor: pointer;
  margin-top: 10px;
  padding: 0;
`;

const CardLikeButtonIcon = styled(LikeIcon)<{ isLiked: boolean }>`
  height: 100%;
  width: 100%;
  transition: transform 0.2s ease-in-out;
  fill: ${({ isLiked }) => (isLiked ? 'red' : 'black')};

  &:hover {
    transform: scale(1.1);
  }
`;
