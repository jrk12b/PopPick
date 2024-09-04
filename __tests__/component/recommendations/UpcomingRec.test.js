import React from 'react';
import {render, screen} from '@testing-library/react-native';
import UpcomingRec from '../../../src/components/recommendations/UpcomingRec';
import {mockRecMovies} from '../../../testData/mockDataMovies';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('UpcomingRec Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with movies', () => {
    render(
      <UpcomingRec
        upcomingMovies={mockRecMovies}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText('Upcoming Recommendations')).toBeTruthy();
    for (let i = 0; i < mockRecMovies.length; i++) {
      expect(screen.getByText(mockRecMovies[i].title)).toBeTruthy();
    }
  });
});
