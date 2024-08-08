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
