import {useState} from 'react';

const useMovieModal = (
  handleAddToMyList,
  handleAddToLiked,
  handleAddToWatched,
) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [listType, setListType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleOptionSelect = option => {
    if (!selectedMovie) {
      return;
    }

    switch (option) {
      case 'addToMyList':
        handleAddToMyList(selectedMovie);
        break;
      case 'addtoLiked':
        handleAddToLiked(selectedMovie);
        break;
      case 'addToWatched':
        handleAddToWatched(selectedMovie);
        break;
      case 'removeFromMyList':
        handleAddToMyList(selectedMovie);
        break;
      case 'removeFromLikedList':
        handleAddToLiked(selectedMovie);
        break;
      case 'removeFromWatchedList':
        handleAddToWatched(selectedMovie);
        break;
    }

    handleCloseModal();
  };

  return {
    selectedMovie,
    listType,
    modalVisible,
    handleShowOptions,
    handleCloseModal,
    handleOptionSelect,
  };
};

export default useMovieModal;
