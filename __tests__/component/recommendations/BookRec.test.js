import React from 'react';
import {render, screen} from '@testing-library/react-native';
import BookRec from '../../../src/components/recommendations/BookRec';
import {mockBookResponseData} from '../../../testData/mockDataBooks';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('BookRec Component', () => {
  const handleShowOptions = jest.fn();
  const navigation = {navigate: jest.fn()};
  it('renders correctly with Fiction Books', () => {
    render(
      <BookRec
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Fiction"
      />,
    );
    expect(screen.getByText('Fiction Recommendations')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Non-Fiction Books', () => {
    render(
      <BookRec
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Non-Fiction"
      />,
    );
    expect(screen.getByText('Non-Fiction Recommendations')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Drama Books', () => {
    render(
      <BookRec
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Drama"
      />,
    );
    expect(screen.getByText('Drama Recommendations')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Adventure Books', () => {
    render(
      <BookRec
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Adventure"
      />,
    );
    expect(screen.getByText('Adventure Recommendations')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });
});
