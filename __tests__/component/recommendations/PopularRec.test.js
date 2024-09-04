import React from 'react';
import {render, screen} from '@testing-library/react-native';
import PopularRec from '../../../src/components/recommendations/PopularRec';
import {mockMyListMovies} from '../../../testData/mockDataMovies';
import {mockMyListTvShows} from '../../../testData/mockDataTvShows';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('PopularRec Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <PopularRec
        popularMovies={mockMyListMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Popular Recommendations')).toBeTruthy();
    for (let i = 0; i < mockMyListMovies.length; i++) {
      expect(screen.getByText(mockMyListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <PopularRec
        popularMovies={mockMyListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />,
    );
    expect(screen.getByText('Popular Recommendations')).toBeTruthy();
    for (let i = 0; i < mockMyListTvShows.length; i++) {
      expect(screen.getByText(mockMyListTvShows[i].name)).toBeTruthy();
    }
  });
});
