import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import OptionsModal from '../../../src/components/general/OptionsModal';
import {
  mockSelectedTvShowNoList,
  mockSelectedTvShowInMyList,
  mockSelectedTvShowInWatchedList,
  mockSelectedTvShowInLikedList,
  mockMyListTvShows,
  mockLikedListTvShows,
  mockWatchedListTvShows,
} from '../../../testData/mockDataTvShows';

describe('OptionsModal Component for Tv Shows', () => {
  const handleCloseModal = jest.fn();
  const handleOptionSelect = jest.fn();
  it('Validate OptionsModal renders with tv show not in any list', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText(mockSelectedTvShowNoList.name)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with tv show in myListTvShows', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowInMyList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText(mockSelectedTvShowInMyList.name)).toBeTruthy();
    expect(screen.getByText('Remove from My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with tv show in watchedListTvShows', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowInWatchedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText(mockSelectedTvShowInWatchedList.name)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Remove from Played List')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with tv show in likedListTvShows', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowInLikedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    expect(screen.getByText(mockSelectedTvShowInLikedList.name)).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Remove from Liked List')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate handleOptionSelect is called when Add to My List is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    fireEvent.press(screen.getByText('Add to My List'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Liked is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Liked'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Played is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Played'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleCloseModal is called when Cancel button is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedTvShowNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListTvShows}
        likedList={mockLikedListTvShows}
        watchedList={mockWatchedListTvShows}
        mediaType="Tv Shows"
      />,
    );

    // Simulate clicking the "Cancel" button
    fireEvent.press(screen.getByText('Cancel'));

    // Verify that handleCloseModal was called
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
