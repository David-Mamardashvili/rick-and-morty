export interface CharacterProps {
  created: string;
  episode: string[];
  gender: 'Male' | 'Female' | 'unknown';
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: 'Alive' | 'Dead' | 'unknown';
  type: string;
  url: string;
  isLiked: boolean;
}

export interface ApiResponse {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: CharacterProps[];
}

export type CardProps = Pick<
  CharacterProps,
  'gender' | 'id' | 'image' | 'name'
>;

export type PopupProps = Pick<
  CharacterProps,
  'gender' | 'id' | 'image' | 'status' | 'species' | 'name'
>;

export interface GlobalStore {
  fetchData: () => Promise<void>;
  characters: CharacterProps[];
  selectedCharacter: PopupProps | null;
  setSelectedCharacter: (character: PopupProps | null) => void;
  toggleLikeCharacter: (id: number) => void;
  charactersFilter: string;
  setCharactersFilter: (character: string) => void;
}
