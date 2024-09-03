import React from 'react';
import {render, screen} from '@testing-library/react-native';
import LikedListFull from '../../../src/components/listsFull/LikedListFull';
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

describe('LikedListFull Component', () => {
  const handleShowOptions = jest.fn();
  it('renders correctly with books', () => {
    render(
      <LikedListFull
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
      />,
    );
    expect(screen.getByText('Liked (1)')).toBeTruthy();
    expect(screen.getByText(mockLikedListBooks[0].title)).toBeTruthy();
  });

  it('renders correctly with movies', () => {
    render(
      <LikedListFull
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Liked (3)')).toBeTruthy();
    for (let i = 0; i < mockLikedListMovies.length; i++) {
      expect(screen.getByText(mockLikedListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <LikedListFull
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText('Liked (1)')).toBeTruthy();
    expect(screen.getByText(mockLikedListTvShows[0].name)).toBeTruthy();
  });

  it('renders correctly with video games', () => {
    render(
      <LikedListFull
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('Liked (1)')).toBeTruthy();
    expect(screen.getByText(mockLikedListVideoGames[0].name)).toBeTruthy();
  });
});
