export interface ExploreData {
  img: string;
  location: string;
  distance: string;
}

export interface CardsData {
  img: string;
  title: string;
}

export interface ILargeCard {
  img: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface ISearchResults {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}
