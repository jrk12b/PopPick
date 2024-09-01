import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Poster from '../general/Poster';
import styles from '../../styles/styles';
import {getPageName} from '../../components/general/ListConstants';

/**
 * CustomRec Component
 *
 * This component displays a horizontal list of custom movie recommendations.
 * Users can navigate to a detailed page for more custom recommendations
 * based on the media type specified.
 *
 * Props:
 * - customMovies: An array of custom movie objects to be displayed.
 * - handleShowOptions: A function that handles showing options for a movie.
 * - navigation: Navigation object used to navigate to the recommendations page.
 * - mediaType: Specifies the type of media (e.g., 'Movies', 'TV Shows').
 */
function CustomRec({customMovies, handleShowOptions, navigation, mediaType}) {
  // Retrieve the page name for navigation based on the media type
  const page = getPageName(mediaType);

  return (
    <View style={styles.sectionContainer}>
      {/* Button to navigate to the custom recommendations page */}
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
        <Text style={styles.sectionTitle}>Custom Recommendations</Text>
      </TouchableOpacity>

      {/* Render a horizontal list of custom movies */}
      <FlatList
        data={customMovies} // Data source for the FlatList
        keyExtractor={(item, index) => `${item.id}-${index}`} // Unique key for each item
        renderItem={({item}) => (
          <Poster
            item={item} // Individual custom movie item to render
            handleShowOptions={handleShowOptions} // Function to show options for the movie
            mediaType={mediaType} // Media type for context
          />
        )}
        horizontal // Display list items horizontally
      />
    </View>
  );
}

export default CustomRec;
