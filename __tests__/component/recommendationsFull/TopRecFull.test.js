import React from 'react';
import {render, screen} from '@testing-library/react-native';
import TopRecFull from '../../../src/components/recommendationsFull/TopRecFull';
import {mockRecMovies} from '../../../testData/mockDataMovies';
import {mockMyListTvShows} from '../../../testData/mockDataTvShows';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('TopRecFull Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <TopRecFull
        topMovies={mockRecMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Top Recommendations (10)')).toBeTruthy();
    for (let i = 0; i < mockRecMovies.length; i++) {
      expect(screen.getByText(mockRecMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <TopRecFull
        topMovies={mockMyListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />,
    );
    expect(screen.getByText('Top Recommendations (2)')).toBeTruthy();
    for (let i = 0; i < mockMyListTvShows.length; i++) {
      expect(screen.getByText(mockMyListTvShows[i].name)).toBeTruthy();
    }
  });
});
