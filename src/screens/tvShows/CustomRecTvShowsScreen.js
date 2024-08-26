import React, {useEffect} from 'react';
import CustomRecFull from '../../components/recommendationsFull/CustomRecFull';
import useTvShowLists from '../../hooks/tvShows/useTvShowLists';
import useTvShowModal from '../../hooks/tvShows/useTvShowModal';
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
      <CustomRecFull
        customMovies={customTvShows}
        handleShowOptions={handleShowOptions}
        mediaType="TV Shows"
      />
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
