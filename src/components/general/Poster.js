import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import {getAccessToken} from '../../hooks/videoGames/auth';
import {VIDEO_GAME_CLIENT_ID} from '../../config';

const Poster = ({
  item,
  mediaType,
  likedList = [],
  myList = [],
  watchedList = [],
  handleShowOptions,
  listType,
}) => {
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    if (mediaType === 'videoGames') {
      const fetchCoverImage = async () => {
        try {
          const accessToken = await getAccessToken();
          const response = await fetch('https://api.igdb.com/v4/covers', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Client-ID': VIDEO_GAME_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
            },
            body: `fields *; where id = ${item.cover};`,
          });
          const data = await response.json();
          if (data.length > 0) {
            const imageUrl = data[0].url.replace(/^\/\//, ''); // Remove leading slashes
            const fullImageUrl = `https:${imageUrl}`;
            setCoverImage(fullImageUrl);
          }
        } catch (error) {
          console.error('Error fetching cover image:', error);
        }
      };

      if (item.cover) {
        fetchCoverImage();
      }
    }
  }, [item.cover, mediaType]);

  // Determine if the item is liked, saved, or watched
  const isLiked = likedList.some(media => media.id === item.id);
  const isSaved = myList.some(media => media.id === item.id);
  const isWatched = watchedList.some(media => media.id === item.id);

  // Get the appropriate image URI based on mediaType
  const imageUri =
    mediaType === 'movies'
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : coverImage;

  return (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleShowOptions(item, listType)}>
        {imageUri ? (
          <Image style={styles.poster} source={{uri: imageUri}} />
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
          {mediaType === 'movies' ? item.title : item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Poster;
