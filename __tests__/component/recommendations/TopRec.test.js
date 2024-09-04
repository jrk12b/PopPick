import React from 'react';
import {render, screen} from '@testing-library/react-native';
import TopRec from '../../../src/components/recommendations/TopRec';
import {mockRecMovies} from '../../../testData/mockDataMovies';
import {mockMyListTvShows} from '../../../testData/mockDataTvShows';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('TopRec Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <TopRec
        topMovies={mockRecMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Top Rated Recommendations')).toBeTruthy();
    for (let i = 0; i < mockRecMovies.length; i++) {
      expect(screen.getByText(mockRecMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <TopRec
        topMovies={mockMyListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />,
    );
    expect(screen.getByText('Top Rated Recommendations')).toBeTruthy();
    for (let i = 0; i < mockMyListTvShows.length; i++) {
      expect(screen.getByText(mockMyListTvShows[i].name)).toBeTruthy();
    }
  });
});
