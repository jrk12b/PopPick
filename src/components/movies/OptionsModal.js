// components/movies/MovieOptionsModal.js
import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';

const MovieOptionsModal = ({
  selectedMovie,
  listType,
  modalVisible,
  handleCloseModal,
  handleOptionSelect,
}) => {
  if (!selectedMovie) {
    return null;
  }

  return (
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
                onPress={() => handleOptionSelect('myList')}
              />
              <Button
                title="Mark as Watched"
                onPress={() => handleOptionSelect('watched')}
              />
              <Button
                title="Mark as Liked"
                onPress={() => handleOptionSelect('like')}
              />
            </>
          )}
          {listType === 'myList' && (
            <>
              <Button
                title="Remove from My List"
                onPress={() => handleOptionSelect('remove')}
              />
              <Button
                title="Mark as Watched"
                onPress={() => handleOptionSelect('watched')}
              />
              <Button
                title="Mark as Liked"
                onPress={() => handleOptionSelect('like')}
              />
            </>
          )}
          {listType === 'likedList' && (
            <>
              <Button
                title="Remove from Liked List"
                onPress={() => handleOptionSelect('remove')}
              />
              <Button
                title="Mark as Watched"
                onPress={() => handleOptionSelect('watched')}
              />
            </>
          )}
          {listType === 'watchedList' && (
            <>
              <Button
                title="Remove from Watched List"
                onPress={() => handleOptionSelect('remove')}
              />
              <Button
                title="Mark as Liked"
                onPress={() => handleOptionSelect('like')}
              />
              <Button
                title="Add to My List"
                onPress={() => handleOptionSelect('myList')}
              />
            </>
          )}
          <Button title="Cancel" onPress={handleCloseModal} />
        </View>
      </View>
    </Modal>
  );
};

export default MovieOptionsModal;
