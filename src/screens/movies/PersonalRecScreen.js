import React, {useEffect} from 'react';
import PersonalRecFull from '../../components/recommendationsFull/PersonalRecFull';
import useMovieLists from '../../hooks/movies/useMovieLists';
import useMovieModal from '../../hooks/movies/useMovieModal';
import OptionsModal from '../../components/general/OptionsModal';

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
        mediaType="Movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myList}
        likedList={likedList}
        watchedList={watchedList}
        mediaType="Movies"
      />
    </>
  );
}

export default PersonalRecScreen;
