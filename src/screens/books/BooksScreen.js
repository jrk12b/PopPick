/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles';
import MyList from '../../components/lists/MyList';
import WatchedList from '../../components/lists/WatchedList';
import LikedList from '../../components/lists/LikedList';
import OptionsModal from '../../components/general/OptionsModal';
import useBookLists from '../../hooks/books/useBookLists';
import useBookModal from '../../hooks/books/useBookModal';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import {useFocusEffect} from '@react-navigation/native';
import BookRec from '../../components/recommendations/BookRec';

/**
 * BooksScreen Component
 *
 * Displays various book lists and recommendations, allowing users
 * to view and interact with their book collections.
 */
function BooksScreen({navigation}) {
  const {
    myListBooks,
    likedListBooks,
    watchedListBooks,
    fictionBooks,
    nonFictionBooks,
    dramaBooks,
    adventurebooks,
    error,
    loading,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchMyList,
    fetchWatchedList,
  } = useBookLists();

  const {
    selectedBook,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useBookModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  // Fetch book data and user lists when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchMyList(); // Fetch user's personal book list
      fetchWatchedList(); // Fetch user's watched book list
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
        <TouchableOpacity onPress={() => navigation.navigate('Search Books')}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      {/* Render the user's lists and recommendations */}
      <MyList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
      />

      <WatchedList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
      />

      <LikedList
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
      />

      <BookRec
        books={fictionBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Fiction"
      />

      <BookRec
        books={nonFictionBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Non-Fiction"
      />

      <BookRec
        books={dramaBooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Drama"
      />

      <BookRec
        books={adventurebooks}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
        mediaType="Books"
        bookSubject="Adventure"
      />

      <OptionsModal
        selectedItem={selectedBook}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListBooks}
        likedList={likedListBooks}
        watchedList={watchedListBooks}
        mediaType="Books"
      />
    </ScrollView>
  );
}

export default BooksScreen;
