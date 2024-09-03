import React from 'react';
import {render, screen} from '@testing-library/react-native';
import MyListFull from '../../../src/components/listsFull/MyListFull';
import {
  mockMyListBooks,
  mockLikedListBooks,
  mockWatchedListBooks,
} from '../../../testData/mockDataBooks';
import {
  mockMyListMovies,
  mockLikedListMovies,
  mockWatchedListMovies,
} from '../../../testData/mockDataMovies';
import {
  mockMyListVideoGame,
  mockLikedListVideoGames,
  mockWatchedListVideoGames,
} from '../../../testData/mockDataVideoGames';
import {
  mockMyListTvShows,
  mockLikedListTvShows,
  mockWatchedListTvShows,
} from '../../../testData/mockDataTvShows';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('MyList Component', () => {
  const handleShowOptions = jest.fn();
  it('renders correctly with books', () => {
    render(
      <MyListFull
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
      />,
    );
    expect(screen.getByText('My List (6)')).toBeTruthy();
    for (let i = 0; i < mockMyListBooks.length; i++) {
      expect(screen.getByText(mockMyListBooks[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with movies', () => {
    render(
      <MyListFull
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('My List (3)')).toBeTruthy();
    for (let i = 0; i < mockMyListMovies.length; i++) {
      expect(screen.getByText(mockMyListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <MyListFull
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText('My List (2)')).toBeTruthy();
    for (let i = 0; i < mockMyListTvShows.length; i++) {
      expect(screen.getByText(mockMyListTvShows[i].name)).toBeTruthy();
    }
  });

  it('renders correctly with video games', () => {
    render(
      <MyListFull
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('My List (2)')).toBeTruthy();
    for (let i = 0; i < mockMyListVideoGame.length; i++) {
      expect(screen.getByText(mockMyListVideoGame[i].name)).toBeTruthy();
    }
  });
});
