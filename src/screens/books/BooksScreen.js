/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import PopularRec from '../../components/recommendations/PopularRec';
import UpcomingRec from '../../components/recommendations/UpcomingRec';
import TopRec from '../../components/recommendations/TopRec';
import PersonalRec from '../../components/recommendations/PersonalRec';
import MyList from '../../components/lists/MyList';
import CustomRec from '../../components/recommendations/CustomRec';
import WatchedList from '../../components/lists/WatchedList';
import LikedList from '../../components/lists/LikedList';
import OptionsModal from '../../components/general/OptionsModal';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import {useFocusEffect} from '@react-navigation/native';

/**
 * MovieScreen Component
 *
 * This screen displays various movie lists and recommendations, allowing users
 * to view and interact with their movie collections and recommendations.
 */
function BookScreen({navigation}) {
  // Custom hook to manage movie lists and fetch movie data
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    popularBooks,
    error,
    loading,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
  } = useBookLists();

  // Custom hook to manage the state and actions for the movie options modal
  const {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useBookModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Fetch movie data and user lists when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchMyList();
      fetchWatchedList();
    }, [likedListBooks]), // Dependency on likedList to refetch when it changes
  );

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
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      <MyList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="books"
      />

      <WatchedList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="books"
      />

      <LikedList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="books"
      />

      {/* Display popular movie recommendations */}
      <PopularRec
        popularMovies={popularBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="books"
      />

      {/* Modal for displaying options related to the selected movie */}
      <OptionsModal
        selectedItem={selectedBook}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        mediaType="books"
      />
    </ScrollView>
  );
}

export default BookScreen;
