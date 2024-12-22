import { create } from 'zustand';
import axios from 'axios';
import { GlobalStore, ApiResponse, CharacterProps } from '../types/types';

const globalStore = create<GlobalStore>((set) => ({
  fetchData: async () => {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    try {
      const response = await axios.get<ApiResponse>(apiUrl);

      const likedCharacters: CharacterProps[] = JSON.parse(
        localStorage.getItem('favorites') || '[]',
      );

      const charactersWithLikes = response.data.results.map((character) => ({
        ...character,
        isLiked: likedCharacters.some(
          (likedChar) => likedChar.id === character.id,
        ),
      }));

      set({ characters: charactersWithLikes });
    } catch (error) {
      console.error('Error:', error);
    }
  },
  characters: [],
  selectedCharacter: null,
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  toggleLikeCharacter: (id) =>
    set((state) => {
      const character = state.characters.find((char) => char.id === id);
      if (!character) return state;

      const updatedCharacters = state.characters.map((char) =>
        char.id === id ? { ...char, isLiked: !char.isLiked } : char,
      );

      const likedCharacters: CharacterProps[] = updatedCharacters.filter(
        (char) => char.isLiked,
      );
      localStorage.setItem('favorites', JSON.stringify(likedCharacters));

      return { characters: updatedCharacters };
    }),
  charactersFilter: '',
  setCharactersFilter: (value) => set({ charactersFilter: value }),
}));

export default globalStore;
