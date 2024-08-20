import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';
import CustomButton from '../CustomButton';

/**
 * MovieOptionsModal Component
 *
 * This component displays a modal with options related to a selected movie. It allows the user
 * to add or remove the movie from their personal lists (e.g., My List, Liked List, Watched List).
 *
 * Props:
 * - selectedMovie: Object - The movie that the options pertain to. Contains details like title, overview, etc.
 * - modalVisible: Boolean - Controls the visibility of the modal.
 * - handleCloseModal: Function - A callback function to close the modal.
 * - handleOptionSelect: Function - A callback function to handle the selection of an option.
 * - myList: Array - A list of movies in the user's personal list.
 * - likedList: Array - A list of movies that the user has liked.
 * - watchedList: Array - A list of movies that the user has watched.
 *
 * Behavior:
 * - The modal checks if the selected movie is in any of the user's lists (My List, Liked List, Watched List).
 * - Depending on which lists the movie is in, the appropriate options are displayed:
 *   - Add to My List, Mark as Watched, Mark as Liked (if the movie is in none of the lists)
 *   - Remove from My List, Remove from Liked List, Remove from Watched List (if the movie is in the respective list)
 *   - Additional options to add the movie to other lists it isn't already in.
 * - The modal is displayed with a sliding animation and can be closed via a Cancel button.
 *
 * Rendering:
 * - The modal shows the movie's title, description, release date, and rating.
 * - Depending on the movie's status in the user's lists, different buttons are rendered for the user to interact with.
 * - When an option is selected, the handleOptionSelect function is invoked with the respective action.
 */
const VideoGameOptionsModal = ({
  selectedVideoGame,
  modalVisible,
  handleCloseModal,
  handleOptionSelect,
  myListVideoGames,
  likedListVideoGames,
  watchedListVideoGames,
}) => {
  if (!selectedVideoGame) {
    return null;
  }

  const isInList = list =>
    list.some(videoGame => videoGame.id === selectedVideoGame.id);

  const inMyList = isInList(myListVideoGames);
  const inLikedList = isInList(likedListVideoGames);
  const inWatchedList = isInList(watchedListVideoGames);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.movieTitle}>{selectedVideoGame.name}</Text>

          {!inMyList && !inLikedList && !inWatchedList && (
            <>
              <CustomButton
                title="Add to My List"
                onPress={() => handleOptionSelect('addToMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Watched"
                onPress={() => handleOptionSelect('addToWatched')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Liked"
                onPress={() => handleOptionSelect('addtoLiked')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </>
          )}

          {inMyList && (
            <>
              <CustomButton
                title="Remove from My List"
                onPress={() => handleOptionSelect('removeFromMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inWatchedList && (
                <CustomButton
                  title="Mark as Watched"
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addtoLiked')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {inLikedList && (
            <>
              <CustomButton
                title="Remove from Liked List"
                onPress={() => handleOptionSelect('removeFromLikedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inWatchedList && (
                <CustomButton
                  title="Mark as Watched"
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {inWatchedList && (
            <>
              <CustomButton
                title="Remove from Watched List"
                onPress={() => handleOptionSelect('removeFromWatchedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addtoLiked')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inMyList && (
                <CustomButton
                  title="Add to My List"
                  onPress={() => handleOptionSelect('addToMyList')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          <Button
            title="Cancel"
            color={styles.text.color}
            onPress={handleCloseModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default VideoGameOptionsModal;
