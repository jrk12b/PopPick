import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SearchList from '../../../src/components/lists/SearchList';
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
  it('renders correctly with books', () => {
    render(
      <SearchList
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
      />,
    );
    expect(screen.getByText('Search')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('No results found.')).toBeTruthy();
    const searchInput = screen.getByPlaceholderText('Search for Books...');
    expect(searchInput).toBeTruthy();
  });

  it('renders correctly with movies', () => {
    render(
      <SearchList
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Search')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('No results found.')).toBeTruthy();
    const searchInput = screen.getByPlaceholderText('Search for Movies...');
    expect(searchInput).toBeTruthy();
  });

  it('renders correctly with tv shows', () => {
    render(
      <SearchList
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText('Search')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('No results found.')).toBeTruthy();
    const searchInput = screen.getByPlaceholderText(
      'Search for Video Games...',
    );
    expect(searchInput).toBeTruthy();
  });

  it('renders correctly with video games', () => {
    render(
      <SearchList
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('Search')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
    expect(screen.getByText('No results found.')).toBeTruthy();
    const searchInput = screen.getByPlaceholderText(
      'Search for Video Games...',
    );
    expect(searchInput).toBeTruthy();
  });
});
