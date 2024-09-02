import React from 'react';
import {render, screen} from '@testing-library/react-native';
import OptionsModal from '../../../src/components/general/OptionsModal';
import {
  mockSelectedBook,
  mockMyListBooks,
  mockLikedListBooks,
  mockWatchedListBooks,
} from '../../../testData/mockData';

describe('OptionsModal Component', () => {
  const handleCloseModal = jest.fn();
  const handleOptionSelect = jest.fn();
  it('renders correctly with given props', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBook}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    expect(screen.getByText(mockSelectedBook.title)).toBeTruthy();
    expect(screen.getByText('Remove from My List')).toBeTruthy();
  });
});
