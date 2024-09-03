import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WatchedList from '../../../src/components/lists/WatchedList';
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

describe('WatchedList Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with books', () => {
    render(
      <WatchedList
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
      />,
    );
    expect(screen.getByText('Read (1)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListBooks.length; i++) {
      expect(screen.getByText(mockWatchedListBooks[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with movies', () => {
    render(
      <WatchedList
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Watched (3)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListMovies.length; i++) {
      expect(screen.getByText(mockWatchedListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <WatchedList
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText('Watched (2)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListTvShows.length; i++) {
      expect(screen.getByText(mockWatchedListTvShows[i].name)).toBeTruthy();
    }
  });

  it('renders correctly with video games', () => {
    render(
      <WatchedList
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('Played (1)')).toBeTruthy();
    for (let i = 0; i < mockWatchedListVideoGames.length; i++) {
      expect(screen.getByText(mockWatchedListVideoGames[i].name)).toBeTruthy();
    }
  });
});
