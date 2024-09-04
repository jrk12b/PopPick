import React from 'react';
import {render, screen} from '@testing-library/react-native';
import PersonalRecFull from '../../../src/components/recommendationsFull/PersonalRecFull';
import {mockMyListMovies} from '../../../testData/mockDataMovies';
import {mockMyListTvShows} from '../../../testData/mockDataTvShows';
import {mockMyListVideoGame} from '../../../testData/mockDataVideoGames';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('PersonalRecFull Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <PersonalRecFull
        personalMovies={mockMyListMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Personal Recommendations (3)')).toBeTruthy();
    for (let i = 0; i < mockMyListMovies.length; i++) {
      expect(screen.getByText(mockMyListMovies[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with tv shows', () => {
    render(
      <PersonalRecFull
        personalMovies={mockMyListTvShows}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="TV Shows"
      />,
    );
    expect(screen.getByText('Personal Recommendations (2)')).toBeTruthy();
    for (let i = 0; i < mockMyListTvShows.length; i++) {
      expect(screen.getByText(mockMyListTvShows[i].name)).toBeTruthy();
    }
  });

  it('renders correctly with video games', () => {
    render(
      <PersonalRecFull
        personalMovies={mockMyListVideoGame}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText('Personal Recommendations (2)')).toBeTruthy();
    for (let i = 0; i < mockMyListVideoGame.length; i++) {
      expect(screen.getByText(mockMyListVideoGame[i].name)).toBeTruthy();
    }
  });
});
