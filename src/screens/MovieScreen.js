import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [listType, setListType] = useState(null); // 'recommendations', 'myList', 'likedList', 'watchedList'
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=15979629ea6e558ef491c9b9ccee0043',
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
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
      {/* Popular Recommendations Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Recommendations</Text>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <TouchableOpacity
                onPress={() => handleShowOptions(item, 'recommendations')}>
                <Image
                  style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      </View>

      {/* My List Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My List</Text>
        {myList.length === 0 ? (
          <Text style={styles.text}>No movies added yet.</Text>
        ) : (
          <FlatList
            data={myList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.movieContainer}>
                <TouchableOpacity
                  onPress={() => handleShowOptions(item, 'myList')}>
                  <Image
                    style={styles.poster}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal
          />
        )}
      </View>

      {/* Liked Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Liked</Text>
        {likedList.length === 0 ? (
          <Text style={styles.text}>No movies added yet.</Text>
        ) : (
          <FlatList
            data={likedList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.movieContainer}>
                <TouchableOpacity
                  onPress={() => handleShowOptions(item, 'likedList')}>
                  <Image
                    style={styles.poster}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal
          />
        )}
      </View>

      {/* Watched Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Watched</Text>
        {watchedList.length === 0 ? (
          <Text style={styles.text}>No movies added yet.</Text>
        ) : (
          <FlatList
            data={watchedList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.movieContainer}>
                <TouchableOpacity
                  onPress={() => handleShowOptions(item, 'watchedList')}>
                  <Image
                    style={styles.poster}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal
          />
        )}
      </View>

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
                    onPress={() => {
                      handleAddToMyList(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Like"
                    onPress={() => {
                      handleAddToLiked(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => {
                      handleAddToWatched(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                </>
              )}
              {listType === 'myList' && (
                <>
                  <Button
                    title="Remove from My List"
                    onPress={() => {
                      handleAddToMyList(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Like"
                    onPress={() => {
                      handleAddToLiked(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => {
                      handleAddToWatched(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                </>
              )}
              {listType === 'likedList' && (
                <>
                  <Button
                    title="Remove from Liked List"
                    onPress={() => {
                      handleAddToLiked(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Add to My List"
                    onPress={() => {
                      handleAddToMyList(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Mark as Watched"
                    onPress={() => {
                      handleAddToWatched(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                </>
              )}
              {listType === 'watchedList' && (
                <>
                  <Button
                    title="Remove from Watched List"
                    onPress={() => {
                      handleAddToWatched(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Add to Liked List"
                    onPress={() => {
                      handleAddToLiked(selectedMovie);
                      handleCloseModal();
                    }}
                  />
                  <Button
                    title="Add to My List"
                    onPress={() => {
                      handleAddToMyList(selectedMovie);
                      handleCloseModal();
                    }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  movieContainer: {
    marginBottom: 20,
    marginRight: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    color: 'white',
    marginTop: 5,
  },
  text: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MoviesScreen;
