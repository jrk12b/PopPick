import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import {getAccessToken} from '../../hooks/videoGames/auth';
import {VIDEO_GAME_CLIENT_ID} from '../../config';

// Utility function to add a delay (in milliseconds)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch the cover image with retry logic in case of rate limiting (429 error)
const fetchCoverImageWithRetry = async (
  item,
  setCoverImage,
  retryCount = 3, // Number of retry attempts
) => {
  try {
    const accessToken = await getAccessToken(); // Get the access token
    await delay(500); // Adding a small delay between requests

    const response = await fetch('https://api.igdb.com/v4/covers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': VIDEO_GAME_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: `fields url; where id = ${item.cover};`,
    });

    // Handle rate limiting (429 error) with retries
    if (response.status === 429 && retryCount > 0) {
      const retryAfter =
        parseInt(response.headers.get('Retry-After'), 10) * 1000 || 1000; // Time to wait before retrying
      await delay(retryAfter); // Wait before retrying
      return fetchCoverImageWithRetry(item, setCoverImage, retryCount - 1); // Retry the request
    }

    const data = await response.json(); // Parse the JSON response
    if (data.length > 0) {
      const imageUrl = data[0].url.replace(/^\/\//, ''); // Remove leading "//" from URL
      const fullImageUrl = `https:${imageUrl}`; // Prepend "https:" to make a complete URL
      setCoverImage(fullImageUrl); // Update the state with the image URL
    }
  } catch (error) {
    console.error('Error fetching cover image:', error); // Log any errors
  }
};

// Function to fetch the cover image with retry logic in case of rate limiting (429 error)
const fetchBookCoverWithRetry = async (item, setBookCoverImage) => {
  try {
    // Check if item is undefined or null
    if (!item) {
      return;
    }

    await delay(500); // Adding a small delay between requests
    const secureUrl = item.replace('http://', 'https://');
    setBookCoverImage(secureUrl);
  } catch (error) {
    console.error('Error fetching cover image:', error); // Log any errors
  }
};

const Poster = ({
  item,
  mediaType,
  likedList = [],
  myList = [],
  watchedList = [],
  handleShowOptions,
  imageUriProp, // for testing purposes
}) => {
  const [coverImage, setCoverImage] = useState(null);
  const [bookCoverImage, setBookCoverImage] = useState(null);

  useEffect(() => {
    if (!imageUriProp) {
      // Only fetch if no imageUriProp is provided
      if (mediaType === 'Video Games' && item.cover) {
        fetchCoverImageWithRetry(item, setCoverImage);
      }
      if (mediaType === 'Books') {
        const imageUrl = item.thumbnail;
        fetchBookCoverWithRetry(imageUrl, setBookCoverImage);
      }
    }
  }, [item, item.cover, mediaType, imageUriProp]);

  const isInList = list => list.some(media => media.id === item.id);

  const isLiked = isInList(likedList);
  const isSaved = isInList(myList);
  const isWatched = isInList(watchedList);

  const imageUri =
    imageUriProp ||
    (() => {
      switch (mediaType) {
        case 'Movies':
        case 'TV Shows':
          return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        case 'Books':
          return bookCoverImage;
        default:
          return coverImage;
      }
    })();
  return (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleShowOptions(item)}>
        {imageUri ? (
          <Image
            style={styles.poster}
            source={{uri: imageUri}}
            testID="poster-image"
          />
        ) : (
          <Text>Loading...</Text>
        )}
        {isLiked && (
          <Icon
            name="favorite"
            size={18}
            color="white"
            style={styles.favoriteIcon}
          />
        )}
        {isSaved && (
          <Icon
            name="bookmark"
            size={18}
            color="white"
            style={styles.savedIcon}
          />
        )}
        {isWatched && (
          <Icon
            name="remove-red-eye"
            size={18}
            color="white"
            style={styles.watchedIcon}
          />
        )}
        <Text style={styles.title}>
          {mediaType === 'Books'
            ? item.title
            : mediaType === 'Movies'
            ? item.title
            : item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Poster;
