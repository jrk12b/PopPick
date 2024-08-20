import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import useVideoGameLists from '../../hooks/videoGames/useVideoGameLists';
import PersonalRec from '../../components/videoGames/recommendations/PersonalRec';
import Loading from '../../components/movies/Loading';
import Error from '../../components/movies/Error';

/**
 * MovieScreen Component
 *
 * This screen displays various movie lists and recommendations, allowing users
 * to view and interact with their movie collections and recommendations.
 */
function VideoGameScreen({navigation}) {
  // Custom hook to manage movie lists and fetch movie data
  const {personalVideoGames, error, loading} = useVideoGameLists();

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Search button to navigate to the search screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Search Movies')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      {/* Display personal movie recommendations */}
      <PersonalRec
        personalVideoGames={personalVideoGames}
        navigation={navigation}
      />
    </ScrollView>
  );
}

export default VideoGameScreen;
