import React, { useEffect } from 'react';
import styled from 'styled-components';
import globalStore from '../store/globalStore';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Popup } from '../components/Popup';
import { CharacterProps } from '../types/types';

export const Home: React.FC = () => {
  const { characters, fetchData, charactersFilter } = globalStore();

  const likedCharacters: CharacterProps[] = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  const displayedCharacters =
    charactersFilter === 'favorites' ? likedCharacters : characters;

  useEffect(() => {
    if (charactersFilter !== 'favorites') {
      fetchData();
    }
  }, [fetchData, charactersFilter]);

  return (
    <PageContainer>
      <Header />
      <CardsContainer>
        {displayedCharacters.map((character: CharacterProps) => (
          <Card
            key={character.id}
            gender={character.gender}
            id={character.id}
            image={character.image}
            name={character.name}
          />
        ))}
        <Popup />
      </CardsContainer>
    </PageContainer>
  );
};

const PageContainer = styled.main`
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
