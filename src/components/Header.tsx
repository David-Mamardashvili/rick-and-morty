import styled from 'styled-components';
import globalStore from '../store/globalStore';
import LogoImage from '../assets/logo.png';

export function Header() {
  const { charactersFilter, setCharactersFilter } = globalStore();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCharactersFilter(value);
  };

  return (
    <HeaderContainer>
      <Logo src={LogoImage} alt="logo" />
      <FilterContainer>
        <Select value={charactersFilter} onChange={handleFilterChange}>
          <option value="all">Все персонажи</option>
          <option value="favorites">Избранные персонажи</option>
        </Select>
      </FilterContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  max-width: 300px;
  user-select: none;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
  gap: 10px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 380px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid #00afc7;
  border-radius: 40px;
  width: 100%;
  max-width: 190px;
  background-color: transparent;
  color: #88cb6a;
`;
