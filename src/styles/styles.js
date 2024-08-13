import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#595959',
    padding: 10,
  },
  // sectionContainer: {
  //   marginBottom: 20,
  // },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBF4F4',
    marginBottom: 10,
  },
  // movieContainer: {
  //   marginBottom: 20,
  //   marginRight: 10,
  // },
  // poster: {
  //   width: 100,
  //   height: 150,
  // },
  title: {
    color: '#FBF4F4',
    marginTop: 5,
  },
  text: {
    color: '#FBF4F4',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#454545',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000', // iOS shadow color
    shadowOffset: {width: 0, height: 2}, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
    elevation: 5, // Android shadow/elevation
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FBF4F4',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    color: '#3b3b3b',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FBF4F4',
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 16,
    color: '#FBF4F4',
    marginBottom: 10,
  },
  movieRelease: {
    fontSize: 16,
    color: '#FBF4F4',
    marginBottom: 15,
  },
  movieRating: {
    fontSize: 16,
    color: '#FBF4F4',
    marginBottom: 15,
  },
  modalButton: {
    color: '#FBF4F4',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#595959',
    padding: 10,
  },
  movieContainer: {
    margin: 5,
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: 100, // Adjust size as needed
    height: 150,
    borderRadius: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    left: '50%',
    transform: [{translateX: -9}], // Center the icon horizontally
  },
  savedIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  watchedIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default styles;
