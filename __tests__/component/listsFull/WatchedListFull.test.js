import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WatchedListFull from '../../../src/components/listsFull/WatchedListFull';
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

describe('WatchedListFull Component', () => {
  const handleShowOptions = jest.fn();
  it('renders correctly with books', () => {
    render(
      <WatchedListFull
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
      />,
    );
    expect(screen.getByText('Read List (1)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListBooks.length; i++) {
      expect(screen.getByText(mockWatchedListBooks[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with movies', () => {
    render(
      <WatchedListFull
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Watched List (3)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListMovies.length; i++) {
      expect(screen.getByText(mockWatchedListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <WatchedListFull
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText('Watched List (2)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListTvShows.length; i++) {
      expect(screen.getByText(mockWatchedListTvShows[i].name)).toBeTruthy();
    }
  });

  it('renders correctly with video games', () => {
    render(
      <WatchedListFull
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('Played List (1)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListVideoGames.length; i++) {
      expect(screen.getByText(mockWatchedListVideoGames[i].name)).toBeTruthy();
    }
  });
});
