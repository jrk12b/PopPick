/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import styles from '../styles/styles';
import PopularRecommendations from '../components/movies/recommendations/PopularRecommendations';
import UpcomingRecommendations from '../components/movies/recommendations/UpcomingRecommendations';
import TopRecommendations from '../components/movies/recommendations/TopRecommendations';
import MyList from '../components/movies/lists/MyList';
import WatchedList from '../components/movies/lists/WatchedList';
import LikedList from '../components/movies/lists/LikedList';

function MovieScreen() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [listType, setListType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=15979629ea6e558ef491c9b9ccee0043',
        );
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=15979629ea6e558ef491c9b9ccee0043',
        );
        const data = await response.json();
        setUpcomingMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=15979629ea6e558ef491c9b9ccee0043',
        );
        const data = await response.json();
        setTopMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  // Handle adding/removing movies to/from lists
  const handleAddToMyList = movie => {
    setMyList(prevList => {
      if (prevList.find(item => item.id === movie.id)) {
        return prevList.filter(item => item.id !== movie.id);
      }
      return [...prevList, movie];
    });
  };

  const handleAddToLiked = movie => {
    setLikedList(prevList => {
      if (prevList.find(item => item.id === movie.id)) {
        return prevList.filter(item => item.id !== movie.id);
      }
      return [...prevList, movie];
    });
  };

  const handleAddToWatched = movie => {
    setWatchedList(prevList => {
      if (prevList.find(item => item.id === movie.id)) {
        return prevList.filter(item => item.id !== movie.id);
      }
      return [...prevList, movie];
    });
    // Remove from My List if present
    setMyList(prevList => prevList.filter(item => item.id !== movie.id));
  };

  const handleShowOptions = (movie, type) => {
    setSelectedMovie(movie);
    setListType(type);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
    setListType(null);
  };

  // Handle modal option selection
  const handleOptionSelect = option => {
    if (!selectedMovie) {
      return;
    }

    switch (option) {
      case 'myList':
        handleAddToMyList(selectedMovie);
        break;
      case 'like':
        handleAddToLiked(selectedMovie);
        break;
      case 'watched':
        handleAddToWatched(selectedMovie);
        break;
      case 'remove':
        if (listType === 'myList') {
          handleAddToMyList(selectedMovie);
        } else if (listType === 'likedList') {
          handleAddToLiked(selectedMovie);
        } else if (listType === 'watchedList') {
          handleAddToWatched(selectedMovie);
        }
        break;
      default:
        break;
    }

    handleCloseModal();
  };

  // Render content based on state
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PopularRecommendations
        popularMovies={popularMovies}
        handleShowOptions={handleShowOptions}
      />

      <UpcomingRecommendations
        upcomingMovies={upcomingMovies}
        handleShowOptions={handleShowOptions}
      />

      <TopRecommendations
        topMovies={topMovies}
        handleShowOptions={handleShowOptions}
      />

      <MyList myList={myList} handleShowOptions={handleShowOptions} />

      <WatchedList
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
      />

      <LikedList likedList={likedList} handleShowOptions={handleShowOptions} />

      {/* Modal for movie options */}
      {selectedMovie && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose an option</Text>
              {listType === 'recommendations' && (
                <>
                  <Button
                    title="Add to My List"
                    onPress={() => handleOptionSelect('myList')}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => handleOptionSelect('watched')}
                  />
                  <Button
                    title="Mark as Liked"
                    onPress={() => handleOptionSelect('like')}
                  />
                </>
              )}
              {listType === 'myList' && (
                <>
                  <Button
                    title="Remove from My List"
                    onPress={() => handleOptionSelect('remove')}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => handleOptionSelect('watched')}
                  />
                  <Button
                    title="Mark as Liked"
                    onPress={() => handleOptionSelect('like')}
                  />
                </>
              )}
              {listType === 'likedList' && (
                <>
                  <Button
                    title="Remove from Liked List"
                    onPress={() => handleOptionSelect('remove')}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => handleOptionSelect('watched')}
                  />
                </>
              )}
              {listType === 'watchedList' && (
                <>
                  <Button
                    title="Remove from Watched List"
                    onPress={() => handleOptionSelect('remove')}
                  />
                  <Button
                    title="Mark as Liked"
                    onPress={() => handleOptionSelect('like')}
                  />
                  <Button
                    title="Add to My List"
                    onPress={() => handleOptionSelect('myList')}
                  />
                </>
              )}
              <Button title="Cancel" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

export default MovieScreen;
