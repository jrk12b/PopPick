import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {mockPosterVideoGameItem} from '../../../testData/mockDataVideoGames';
import {mockPosterMovieItem} from '../../../testData/mockDataMovies';
import {mockPosterBookItem} from '../../../testData/mockDataBooks';
import {mockPosterTvShowItem} from '../../../testData/mockDataTvShows';
import Poster from '../../../src/components/general/Poster';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

// Mock react-native-vector-icons/MaterialIcons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock getAccessToken to avoid actual API calls
jest.mock('../../../src/hooks/videoGames/auth', () => ({
  getAccessToken: jest.fn(() => Promise.resolve('mockAccessToken')),
}));

describe('Poster Component', () => {
  const handleShowOptions = jest.fn();

  it('Validate Poster renders with Video Game and image is displayed', async () => {
    render(
      <Poster
        item={mockPosterVideoGameItem}
        handleShowOptions={handleShowOptions}
        mediaType="Video Games"
        imageUriProp={mockPosterVideoGameItem.coverImageUrl}
      />,
    );

    expect(screen.getByText(mockPosterVideoGameItem.name)).toBeTruthy();

    const image = await screen.findByTestId('poster-image');
    expect(image).toBeTruthy();

    expect(image.props.source.uri).toBe(mockPosterVideoGameItem.coverImageUrl);
  });

  it('Validate Poster renders with Movie and image is displayed', async () => {
    render(
      <Poster
        item={mockPosterMovieItem}
        handleShowOptions={handleShowOptions}
        mediaType="Movies"
        imageUriProp={mockPosterMovieItem.coverImageUrl}
      />,
    );

    expect(screen.getByText(mockPosterMovieItem.title)).toBeTruthy();

    const image = await screen.findByTestId('poster-image');
    expect(image).toBeTruthy();

    expect(image.props.source.uri).toBe(mockPosterMovieItem.coverImageUrl);
  });

  it('Validate Poster renders with Book and image is displayed', async () => {
    render(
      <Poster
        item={mockPosterBookItem}
        handleShowOptions={handleShowOptions}
        mediaType="Books"
        imageUriProp={mockPosterBookItem.coverImageUrl}
      />,
    );

    expect(screen.getByText(mockPosterBookItem.title)).toBeTruthy();

    const image = await screen.findByTestId('poster-image');
    expect(image).toBeTruthy();

    expect(image.props.source.uri).toBe(mockPosterBookItem.coverImageUrl);
  });

  it('Validate Poster renders with Tv Show and image is displayed', async () => {
    render(
      <Poster
        item={mockPosterTvShowItem}
        handleShowOptions={handleShowOptions}
        mediaType="Tv Shows"
        imageUriProp={mockPosterTvShowItem.coverImageUrl}
      />,
    );

    expect(screen.getByText(mockPosterTvShowItem.name)).toBeTruthy();

    const image = await screen.findByTestId('poster-image');
    expect(image).toBeTruthy();

    expect(image.props.source.uri).toBe(mockPosterTvShowItem.coverImageUrl);
  });
});
