import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styles from '../styles/styles';
import PopularRecommendations from '../components/movies/recommendations/PopularRecommendations';
import UpcomingRecommendations from '../components/movies/recommendations/UpcomingRecommendations';
import TopRecommendations from '../components/movies/recommendations/TopRecommendations';
import MyList from '../components/movies/lists/MyList';
import WatchedList from '../components/movies/lists/WatchedList';
import LikedList from '../components/movies/lists/LikedList';
import OptionsModal from '../components/movies/OptionsModal';
import useMovies from '../../hooks/useMovies';
import useMovieLists from '../../hooks/useMovieLists';
import Loading from '../components/movies/Loading';
import Error from '../components/movies/Error';
import useMovieModal from '../../hooks/useMovieModal';

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

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <MyList
        myList={myList}
        handleShowOptions={handleShowOptions}
        navigation={navigation}
      />

      <WatchedList
        watchedList={watchedList}
        handleShowOptions={handleShowOptions}
      />

      <LikedList likedList={likedList} handleShowOptions={handleShowOptions} />

      <OptionsModal
        selectedMovie={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
      />
    </ScrollView>
  );
}

export default MovieScreen;
