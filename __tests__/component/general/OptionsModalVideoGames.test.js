import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import OptionsModal from '../../../src/components/general/OptionsModal';
import {
  mockSelectedVideoGameNoList,
  mockSelectedVideoGameInMyList,
  mockSelectedVideoGameInWatchedList,
  mockSelectedVideoGameInLikedList,
  mockMyListVideoGame,
  mockLikedListVideoGames,
  mockWatchedListVideoGames,
} from '../../../testData/mockDataVideoGames';

describe('OptionsModal Component for Video Games', () => {
  const handleCloseModal = jest.fn();
  const handleOptionSelect = jest.fn();
  it('Validate OptionsModal renders with video game not in any list', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText(mockSelectedVideoGameNoList.name)).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with Video Game in myListVideoGames', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameInMyList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    expect(screen.getByText(mockSelectedVideoGameInMyList.name)).toBeTruthy();
    expect(screen.getByText('Remove from My List')).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with video game in watchedListVideoGame', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameInWatchedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    expect(
      screen.getByText(mockSelectedVideoGameInWatchedList.name),
    ).toBeTruthy();
    expect(screen.getByText('Add to My List')).toBeTruthy();
    expect(screen.getByText('Remove from Played List')).toBeTruthy();
    expect(screen.getByText('Mark as Liked')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate OptionsModal renders with video game in likedListVideoGame', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameInLikedList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    expect(
      screen.getByText(mockSelectedVideoGameInLikedList.name),
    ).toBeTruthy();
    expect(screen.getByText('Mark as Played')).toBeTruthy();
    expect(screen.getByText('Remove from Liked List')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  it('Validate handleOptionSelect is called when Add to My List is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    fireEvent.press(screen.getByText('Add to My List'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Liked is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Liked'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleOptionSelect is called when Mark as Played is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );
    fireEvent.press(screen.getByText('Mark as Played'));
    expect(handleOptionSelect).toHaveBeenCalled();
  });

  it('Validate handleCloseModal is called when Cancel button is clicked', () => {
    render(
      <OptionsModal
        selectedItem={mockSelectedVideoGameNoList}
        modalVisible={true}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={mockMyListVideoGame}
        likedList={mockLikedListVideoGames}
        watchedList={mockWatchedListVideoGames}
        mediaType="Video Games"
      />,
    );

    // Simulate clicking the "Cancel" button
    fireEvent.press(screen.getByText('Cancel'));

    // Verify that handleCloseModal was called
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
