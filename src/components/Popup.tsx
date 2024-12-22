import React from 'react';
import styled, { css } from 'styled-components';
import globalStore from '../store/globalStore';
import { ReactComponent as PopupCloseIconSvg } from '../assets/popup-close-icon.svg';
import { useEffect } from 'react';

export const Popup: React.FC = () => {
  const { selectedCharacter, setSelectedCharacter } = globalStore();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.target === e.currentTarget && setSelectedCharacter(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCharacter(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCharacter, setSelectedCharacter]);

  return (
    selectedCharacter && (
      <Overlay onClick={handleOverlayClick}>
        <PopupContainer gender={selectedCharacter?.gender}>
          <PopupCloseButton onClick={() => setSelectedCharacter(null)}>
            <PopupCloseButtonIcon />
          </PopupCloseButton>
          <PopupImage
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
          />
          <PopupName>
            <span className="label">Name: </span>
            <span>{selectedCharacter.name}</span>
          </PopupName>
          <PopupStatus>
            <span className="label">Status: </span>
            <span>{selectedCharacter.status}</span>
          </PopupStatus>
          <PopupSpecies>
            <span className="label">Species: </span>
            <span>{selectedCharacter.species}</span>
          </PopupSpecies>
          <PopupGender>
            <span className="label">Gender: </span>
            <span>{selectedCharacter.gender}</span>
          </PopupGender>
        </PopupContainer>
      </Overlay>
    )
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div<{ gender?: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #fff;
  border: 2px solid #83bf46;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 17px;
  overflow: hidden;
  padding: 40px;
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

  .label {
    color: #000;
  }
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
`;

const PopupCloseButtonIcon = styled(PopupCloseIconSvg)`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const PopupImage = styled.img`
  max-width: 300px;
`;

const PopupName = styled.div``;

const PopupStatus = styled.div``;

const PopupSpecies = styled.div``;

const PopupGender = styled.div``;
