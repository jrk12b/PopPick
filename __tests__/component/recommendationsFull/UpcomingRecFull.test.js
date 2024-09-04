import React from 'react';
import {render, screen} from '@testing-library/react-native';
import UpcomingRecFull from '../../../src/components/recommendationsFull/UpcomingRecFull';
import {mockRecMovies} from '../../../testData/mockDataMovies';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('UpcomingRecFull Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <UpcomingRecFull
        upcomingMovies={mockRecMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Upcoming Recommendations (10)')).toBeTruthy();
    for (let i = 0; i < mockRecMovies.length; i++) {
      expect(screen.getByText(mockRecMovies[i].title)).toBeTruthy();
    }
  });
});
