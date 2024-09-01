import React, {useEffect} from 'react';
import CustomRecFull from '../../components/recommendationsFull/CustomRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
import OptionsModal from '../../components/general/OptionsModal';

/**
 * CustomRecScreen Component
 *
 * This screen displays personalized TV show recommendations based on the user's
 * liked TV shows. It fetches recommendations when the component mounts and
 * provides functionality for managing TV show lists and viewing TV show options.
 */
function CustomRecScreen() {
  const {
    myListTvShows,
    likedListTvShows,
    watchedListTvShows,
    customTvShows,
    handleAddToMyList,
    handleAddToLiked,
    handleAddToWatched,
    fetchCustomRecs,
  } = useTvShowLists();

  useEffect(() => {
    fetchCustomRecs();
  }, [fetchCustomRecs]);

  const {
    selectedTvShow,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  } = useTvShowModal(handleAddToMyList, handleAddToLiked, handleAddToWatched);

  return (
    <>
      {/* Component to display the custom TV show recommendations */}
      <CustomRecFull
        customMovies={customTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
      {/* Modal for displaying options related to the selected TV show */}
      <OptionsModal
        selectedItem={selectedTvShow}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        handleOptionSelect={handleOptionSelect}
        myList={myListTvShows}
        likedList={likedListTvShows}
        watchedList={watchedListTvShows}
        mediaType="TV Shows"
      />
    </>
  );
}

export default CustomRecScreen;
