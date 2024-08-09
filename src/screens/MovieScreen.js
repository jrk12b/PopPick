/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/styles';
import PopularRecommendations from '../components/movies/recommendations/PopularRecommendations';
import UpcomingRecommendations from '../components/movies/recommendations/UpcomingRecommendations';
import TopRecommendations from '../components/movies/recommendations/TopRecommendations';
import PersonalRecommendations from '../components/movies/recommendations/PersonalRecommendations';
import MyList from '../components/movies/lists/MyList';
import WatchedList from '../components/movies/lists/WatchedList';
import LikedList from '../components/movies/lists/LikedList';
import OptionsModal from '../components/movies/OptionsModal';
import useMovies from '../../hooks/useMovies';
import useMovieLists from '../../hooks/useMovieLists';
import Loading from '../components/movies/Loading';
import Error from '../components/movies/Error';
import useMovieModal from '../../hooks/useMovieModal';
import shuffleArray from '../../utils/shuffleArray';
import SearchPrompt from '../components/movies/SearchPrompt';
import SearchResults from '../components/movies/SearchResults';

function MovieScreen({navigation}) {
  const {
    myList,
    likedList,
    watchedList,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
  } = useMovieLists();

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  const [personalMovies, setPersonalMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [results, setResults] = useState([]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const likedMovieIds = likedList.map(movie => movie.id);
      const recommendations = await Promise.all(
        likedMovieIds.map(id =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=15979629ea6e558ef491c9b9ccee0043`,
          )
            .then(response => response.json())
            .then(data => data.results),
        ),
      );

      const allRecommendations = recommendations.flat();
      const uniqueRecommendations = Array.from(
        new Set(allRecommendations.map(movie => movie.id)),
      ).map(id => allRecommendations.find(movie => movie.id === id));

      const shuffledRecommendations = shuffleArray(uniqueRecommendations);
      setPersonalMovies(shuffledRecommendations);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [likedList]);

  useMovies(
    'https://api.themoviedb.org/3/movie/popular?api_key=15979629ea6e558ef491c9b9ccee0043',
    setPopularMovies,
    setLoading,
    setError,
  );

  useMovies(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=15979629ea6e558ef491c9b9ccee0043',
    setUpcomingMovies,
    setLoading,
    setError,
  );

  useMovies(
    'https://api.themoviedb.org/3/movie/top_rated?api_key=15979629ea6e558ef491c9b9ccee0043',
    setTopMovies,
    setLoading,
    setError,
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  // Combine all movies from the lists
  const allListMovies = [...myList, ...likedList, ...watchedList].map(
    movie => movie.id,
  );

  // Filter out movies that are already on any list
  const filterList = movies =>
    movies.filter(movie => !allListMovies.includes(movie.id));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSearchVisible(true)}>
          <Icon name="search" size={24} color="#FBF4F4" />
        </TouchableOpacity>
      </View>

      <PersonalRecommendations
        personalMovies={filterList(personalMovies)}
        handleShowOptions={handleShowOptions}
      />

      <PopularRecommendations
        popularMovies={filterList(popularMovies)}
        handleShowOptions={handleShowOptions}
      />

      <UpcomingRecommendations
        upcomingMovies={filterList(upcomingMovies)}
        handleShowOptions={handleShowOptions}
      />

      <TopRecommendations
        topMovies={filterList(topMovies)}
        handleShowOptions={handleShowOptions}
      />

      <MyList
        myList={myList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <WatchedList
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <LikedList
        likedList={likedList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
      />

      <SearchPrompt
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSearch={query => {
          // Handle search functionality here
          console.log('Search query:', query);
          setResults(query);
        }}
      />
      <SearchResults results={results} />
    </ScrollView>
  );
}

export default MovieScreen;
