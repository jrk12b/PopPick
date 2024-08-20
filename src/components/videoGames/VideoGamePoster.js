import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import {getAccessToken} from '../../hooks/videoGames/auth';

const VideoGamePoster = ({item, handleShowOptions, listType}) => {
  const [coverImage, setCoverImage] = useState(null);
  const coverId = item.cover; // Get the cover ID from the item

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        const accessToken = await getAccessToken(); // Ensure you have this function to get your access token
        const response = await fetch('https://api.igdb.com/v4/covers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Client-ID': 'wc9b1y8gfoqi232h1fsi5bonzxbnwx',
            Authorization: `Bearer ${accessToken}`,
          },
          body: `fields *; where id = ${coverId};`,
        });
        const data = await response.json();
        console.log('cover response: ' + JSON.stringify(data));
        if (data.length > 0) {
          // Ensure the URL has the proper scheme
          const imageUrl = data[0].url.replace(/^\/\//, ''); // Remove leading slashes
          const fullImageUrl = `https:${imageUrl}`; // Add the https:// prefix
          console.log('fullImageUrl: ' + fullImageUrl);
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
          <Image
            style={styles.poster}
            source={{uri: coverImage}} // Use the fetched cover image
          />
        ) : (
          <Text>Loading...</Text> // Optional: Show loading state
        )}
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoGamePoster;
