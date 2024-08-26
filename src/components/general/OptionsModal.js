import React from 'react';
import {View, Text, Modal, Button} from 'react-native';
import styles from '../../styles/styles';
import CustomButton from './CustomButton';

/**
 * OptionsModal is a modal component that provides users with options to add or remove a selected
 * media item (movie or video game) from their lists (e.g., My List, Liked List, Watched List).
 * It displays the title, description, release date, and rating of the selected item and allows
 * users to perform actions based on the current state of the item in the user's lists.
 *
 * Props:
 * - selectedItem: The currently selected media item (movie or video game).
 * - modalVisible: Boolean value to control the visibility of the modal.
 * - handleCloseModal: Function to close the modal.
 * - handleOptionSelect: Function to handle the selection of an option (e.g., add to list).
 * - myList: Array of items in the user's "My List".
 * - likedList: Array of items in the user's "Liked List".
 * - watchedList: Array of items in the user's "Watched List".
 * - mediaType: String indicating the type of media ("movies" or "videoGames").
 */
const OptionsModal = ({
  selectedItem,
  modalVisible,
  handleCloseModal,
  handleOptionSelect,
  myList,
  likedList,
  watchedList,
  mediaType,
}) => {
  // Return null if no item is selected to avoid rendering an empty modal
  if (!selectedItem) {
    return null;
  }

  // Utility function to check if the selected item is in a given list
  const isInList = list => list.some(item => item.id === selectedItem.id);

  // Determine whether the selected item is in each of the user's lists
  const inMyList = isInList(myList);
  const inLikedList = isInList(likedList);
  const inWatchedList = isInList(watchedList);

  // Convert the first release date (timestamp) to a readable date format
  const date = new Date(selectedItem.first_release_date * 1000);
  const readableDate = date.toLocaleDateString();

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.movieTitle}>
            {mediaType === 'movies' || mediaType === 'TV Shows'
              ? selectedItem.title
              : selectedItem.name}
          </Text>

          {/* Display specific information based on the media type */}
          {mediaType === 'movies' && (
            <>
              <Text style={styles.movieDescription}>
                {selectedItem.overview}
              </Text>
              <Text style={styles.movieRelease}>
                Release date: {selectedItem.release_date}
              </Text>
              <Text style={styles.movieRating}>
                Rating: {selectedItem.vote_average}
              </Text>
            </>
          )}
          {mediaType === 'TV SHows' && (
            <>
              <Text style={styles.movieDescription}>
                {selectedItem.overview}
              </Text>
              <Text style={styles.movieRelease}>
                Release date: {selectedItem.release_date}
              </Text>
              <Text style={styles.movieRating}>
                Rating: {selectedItem.vote_average}
              </Text>
            </>
          )}
          {mediaType === 'videoGames' && (
            <>
              <Text style={styles.movieRelease}>
                Release date: {readableDate}
              </Text>
              <Text style={styles.movieRating}>
                Rating:{' '}
                {selectedItem.rating
                  ? selectedItem.rating.toFixed(1)
                  : 'Not Available'}
              </Text>
            </>
          )}

          {/* Render options for items not in any list */}
          {!inMyList && !inLikedList && !inWatchedList && (
            <>
              <CustomButton
                title="Add to My List"
                onPress={() => handleOptionSelect('addToMyList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title={
                  mediaType === 'movies' ? 'Mark as Watched' : 'Mark as Played'
                }
                onPress={() => handleOptionSelect('addToWatched')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title="Mark as Liked"
                onPress={() => handleOptionSelect('addToLiked')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </>
          )}

          {/* Render options for items already in "My List" */}
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
                  title={
                    mediaType === 'movies'
                      ? 'Mark as Watched'
                      : 'Mark as Played'
                  }
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addToLiked')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {/* Render options for items already in "Liked List" */}
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
                  title={
                    mediaType === 'movies'
                      ? 'Mark as Watched'
                      : 'Mark as Played'
                  }
                  onPress={() => handleOptionSelect('addToWatched')}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </>
          )}

          {/* Render options for items already in "Watched List" */}
          {inWatchedList && (
            <>
              <CustomButton
                title={
                  mediaType === 'movies'
                    ? 'Remove from Watched List'
                    : 'Remove from Played List'
                }
                onPress={() => handleOptionSelect('removeFromWatchedList')}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {!inLikedList && (
                <CustomButton
                  title="Mark as Liked"
                  onPress={() => handleOptionSelect('addToLiked')}
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

          {/* Button to close the modal */}
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

export default OptionsModal;
