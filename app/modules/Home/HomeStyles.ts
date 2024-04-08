import {StyleSheet} from 'react-native';
import {
  Colors,
} from '../../constants';
 
export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height:50,
    backgroundColor: Colors.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize:16,
    color: Colors.white,
    fontWeight: '600',
  },
  itemContainer: {
    width: '100%',
    height:50,
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10,
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
    marginRight: 5
  },
  deleteBtn: {
    marginLeft: 5
  },
  floaterBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: Colors.gray,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 30,
    color: Colors.white,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  radioContainer: {
    backgroundColor: Colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledRadio: {
    backgroundColor: Colors.green,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  centeredRow: {
    alignItems: 'center',
  },
});