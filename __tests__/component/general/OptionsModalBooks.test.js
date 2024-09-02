import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import OptionsModal from '../../../src/components/general/OptionsModal';
import {
  mockSelectedBookNoList,
  mockSelectedBookInMyList,
  mockSelectedBookInWatchedList,
  mockSelectedBookInLikedList,
  mockMyListBooks,
  mockLikedListBooks,
  mockWatchedListBooks,
} from '../../../testData/mockDataBooks';

describe('OptionsModal Component for Books', () => {
  const handleCloseModal = jest.fn();
  const handleOptionSelect = jest.fn();
  it('Validate OptionsModal renders with book not in any list', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    expect(screen.getByText(mockSelectedBookNoList.title)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with book in myListBooks', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookInMyList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    expect(screen.getByText(mockSelectedBookInMyList.title)).toBeTruthy();
    expect(screen.getByText('Remove from My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with book in watchedListBooks', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookInWatchedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    expect(screen.getByText(mockSelectedBookInWatchedList.title)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Remove from Played List')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with book in likedListBooks', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookInLikedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    expect(screen.getByText(mockSelectedBookInLikedList.title)).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Remove from Liked List')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate handleOptionSelect is called when Add to My List is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    fireEvent.press(screen.getByText('Add to My List'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Liked is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Liked'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Played is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Played'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleCloseModal is called when Cancel button is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedBookNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListBooks}
        likedList={mockLikedListBooks}
        watchedList={mockWatchedListBooks}
        mediaType="Books"
      />,
    );

    // Simulate clicking the "Cancel" button
    fireEvent.press(screen.getByText('Cancel'));

    // Verify that handleCloseModal was called
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
