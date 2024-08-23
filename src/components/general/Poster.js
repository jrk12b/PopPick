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

const Poster = ({
  item,
  mediaType,
  likedList = [],
  myList = [],
  watchedList = [],
  handleShowOptions,
}) => {
  const [coverImage, setCoverImage] = useState(null); // State to store the cover image URL

  // Fetch the cover image if the media type is 'videoGames' and the item has a cover ID
  useEffect(() => {
    if (mediaType === 'videoGames' && item.cover) {
      fetchCoverImageWithRetry(item, setCoverImage); // Fetch the cover image with retry logic
    }
  }, [item, item.cover, mediaType]);

  // Check if the item is in the liked, saved, or watched lists
  const isLiked = likedList.some(media => media.id === item.id);
  const isSaved = myList.some(media => media.id === item.id);
  const isWatched = watchedList.some(media => media.id === item.id);

  // Determine the image URI based on the media type
  const imageUri =
    mediaType === 'movies'
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}` // Movie poster URL
      : coverImage; // Video game cover image URL

  return (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleShowOptions(item)}>
        {imageUri ? (
          <Image style={styles.poster} source={{uri: imageUri}} /> // Display the image
        ) : (
          <Text>Loading...</Text> // Show loading text while the image is being fetched
        )}
        {/* Conditionally render icons based on whether the item is liked, saved, or watched */}
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
          {/* Display the title or name */}
          {mediaType === 'movies' ? item.title : item.name}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Poster;
