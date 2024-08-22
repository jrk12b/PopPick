import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import {getAccessToken} from '../../hooks/videoGames/auth';
import {VIDEO_GAME_CLIENT_ID} from '../../config';

const VideoGamePoster = ({item, handleShowOptions, listType}) => {
  const [coverImage, setCoverImage] = useState(null);
  const coverId = item.cover; // Get the cover ID from the item

  useEffect(() => {
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
          body: `fields *; where id = ${coverId};`,
        });
        const data = await response.json();
        if (data.length > 0) {
          // Ensure the URL has the proper scheme
          const imageUrl = data[0].url.replace(/^\/\//, ''); // Remove leading slashes
          const fullImageUrl = `https:${imageUrl}`; // Add the https:// prefix
          setCoverImage(fullImageUrl);
        }
      } catch (error) {
        console.error('Error fetching cover image:', error);
      }
    };

    if (coverId) {
      fetchCoverImage();
    }
  }, [coverId]);

  return (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleShowOptions(item, listType)}>
        {coverImage ? (
          <Image style={styles.poster} source={{uri: coverImage}} />
        ) : (
          <Text>Loading...</Text>
        )}
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoGamePoster;
