import React, {useEffect} from 'react';
import CustomRecFull from '../../components/recommendationsFull/CustomRecFull';
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
function CustomRecScreen() {
  const {
    myList,
    likedList,
    watchedList,
    customMovies,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchCustomRecs,
  } = useMovieLists();

  useEffect(() => {
    fetchCustomRecs();
  }, [fetchCustomRecs]);

  const {
    selectedMovie,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useMovieModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      <CustomRecFull
        customMovies={customMovies}
        handleShowOptions={handleShowOptions}
        mediaType="movies"
      />
      <OptionsModal
        selectedItem={selectedMovie}
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

export default CustomRecScreen;
