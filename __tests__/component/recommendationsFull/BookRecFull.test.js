import React from 'react';
import {render, screen} from '@testing-library/react-native';
import BookRecFull from '../../../src/components/recommendationsFull/BookRecFull';
import {mockBookResponseData} from '../../../testData/mockDataBooks';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('BookRecFull Component', () => {
  const handleShowOptions = jest.fn();
  it('renders correctly with Fiction Books', () => {
    render(
      <BookRecFull
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Fiction"
      />,
    );
    expect(screen.getByText('Fiction Recommendations (3)')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Non-Fiction Books', () => {
    render(
      <BookRecFull
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Non-Fiction"
      />,
    );
    expect(screen.getByText('Non-Fiction Recommendations (3)')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Drama Books', () => {
    render(
      <BookRecFull
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Drama"
      />,
    );
    expect(screen.getByText('Drama Recommendations (3)')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });

  it('renders correctly with Adventure Books', () => {
    render(
      <BookRecFull
        books={mockBookResponseData}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        bookSubject="Adventure"
      />,
    );
    expect(screen.getByText('Adventure Recommendations (3)')).toBeTruthy();
    for (let i = 0; i < mockBookResponseData.length; i++) {
      expect(screen.getByText(mockBookResponseData[i].title)).toBeTruthy();
    }
  });
});
