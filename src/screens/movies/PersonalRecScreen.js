import React, {useEffect} from 'react';
import PersonalRecFull from '../../components/movies/recommendations/recFull/PersonalRecFull';
import useMovieLists from '../../hooks/useMovieLists';
import useMovieModal from '../../hooks/useMovieModal';
import OptionsModal from '../../components/movies/OptionsModal';

/**
 * PersonalRecScreen Component
 *
 * This screen displays personalized movie recommendations based on the user's
 * liked movies. It fetches recommendations when the component mounts and
 * provides functionality for managing movie lists and viewing movie options.
 */
function PersonalRecScreen() {
  const {
    myList,
    likedList,
    watchedList,
    personalMovies,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchRecommendations,
  } = useMovieLists();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <PersonalRecFull
        personalMovies={personalMovies}
        handleShowOptions={handleShowOptions}
        mediaType="movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        listType={listType}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="movies"
      />
    </>
  );
}

export default PersonalRecScreen;
