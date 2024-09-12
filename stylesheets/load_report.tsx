import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  greaterContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '70%',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    flex: 1,
    maxHeight: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  tableContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableRow: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
});