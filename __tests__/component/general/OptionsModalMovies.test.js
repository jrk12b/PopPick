import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import OptionsModal from '../../../src/components/general/OptionsModal';
import {
  mockSelectedMovieNoList,
  mockSelectedMovieInMyList,
  mockSelectedMovieInWatchedList,
  mockSelectedMovieInLikedList,
  mockMyListMovies,
  mockLikedListMovies,
  mockWatchedListMovies,
} from '../../../testData/mockDataMovies';

describe('OptionsModal Component for Movies', () => {
  const handleCloseModal = jest.fn();
  const handleOptionSelect = jest.fn();
  it('Validate OptionsModal renders with movie not in any list', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText(mockSelectedMovieNoList.title)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Mark as Watched')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with movie in myListMovies', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieInMyList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText(mockSelectedMovieInMyList.title)).toBeTruthy();
    expect(screen.getByText('Remove from My List')).toBeTruthy();
    expect(screen.getByText('Mark as Watched')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with movie in watchedListMovies', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieInWatchedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText(mockSelectedMovieInWatchedList.title)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Remove from Watched List')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with movie in likedListMovies', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieInLikedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    expect(screen.getByText(mockSelectedMovieInLikedList.title)).toBeTruthy();
    expect(screen.getByText('Mark as Watched')).toBeTruthy();
    expect(screen.getByText('Remove from Liked List')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate handleOptionSelect is called when Add to My List is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    fireEvent.press(screen.getByText('Add to My List'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Liked is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Liked'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Played is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Watched'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleCloseModal is called when Cancel button is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedMovieNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListMovies}
        likedList={mockLikedListMovies}
        watchedList={mockWatchedListMovies}
        mediaType="Movies"
      />,
    );

    // Simulate clicking the "Cancel" button
    fireEvent.press(screen.getByText('Cancel'));

    // Verify that handleCloseModal was called
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
