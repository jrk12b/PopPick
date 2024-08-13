import {StyleSheet} from 'react-native';

const searchListStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#595959',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#FBF4F4', // Ensure the text color in input matches your design
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FBF4F4', // Set your desired background color for the button
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#595959', // Set the text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBF4F4', // Set the text color for the movie title
    marginTop: 5, // Adds space between the poster and the title
    textAlign: 'left',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  noResultsText: {
    color: '#FBF4F4', // Set the text color for "No results found."
    fontSize: 16,
    textAlign: 'center',
  },
  suggestionsList: {
    position: 'absolute',
    top: 50, // Adjust according to the position of your TextInput
    left: 10,
    right: 10,
    backgroundColor: '#595959',
    maxHeight: 200, // Set a max height for the suggestions list
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    color: '#FBF4F4',
  },
  posterContainer: {
    position: 'relative',
    width: 100,
    height: 150,
    marginBottom: 10, // Adds space below the poster for the title
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    left: '50%',
    transform: [{translateX: -9}],
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
  movieContainer: {
    flex: 1,
    margin: 5,
    flexGrow: 1,
  },
  resultsContainer: {
    flexGrow: 1,
  },
});

export default searchListStyles;
