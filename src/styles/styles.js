import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
    backgroundColor: '#595959',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#595959',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FBF4F4',
    marginBottom: 10,
  },
  title: {
    color: '#FBF4F4',
    marginTop: 5,
    width: 100,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FBF4F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#595959',
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'center',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  buttonSearch: {
    backgroundColor: '#FBF4F4',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextSearch: {
    color: '#595959',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#FBF4F4',
  },
  textHeader: {
    color: '#FBF4F4',
    textAlign: 'center',
    fontSize: 24,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: '#FBF4F4',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#595959',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  movieContainer: {
    margin: 5,
  },
  poster: {
    width: '100%',
    height: 150,
    borderRadius: 10,
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
  noResultsText: {
    color: '#FBF4F4',
    fontSize: 16,
    textAlign: 'center',
  },
  suggestionsList: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: '#595959',
    maxHeight: 200,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    color: '#FBF4F4',
  },
  resultsContainer: {
    flexGrow: 1,
  },
});

export default styles;
