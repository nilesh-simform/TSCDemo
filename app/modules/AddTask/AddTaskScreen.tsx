import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Button, Row} from '../../components';
import {styles} from './AddTaskStyles';
import Database from '../../constants/Config';

const DB = Database.getDatabase();

export const AddTask = ({route, navigation}) => {
  const [taskName, setTaskName] = useState<string>('');

  let {userId} = route.params;
  const addTask = () => {
    if (!taskName) {
      Alert.alert('Enter Task Name');
      return;
    }

    DB.executeSql(
      'insert into todos (userId, title, is_completed) values (?,?,?)',
      [userId, taskName, false],
      (result) => {
        setTaskName('');
        console.log("Success",result)
        navigation.goBack()
      },
      (e) => {
        console.log('Error', e);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          value={taskName}
          onChangeText={val => setTaskName(val)}
          placeholder={'Enter Task Name'}
          style={styles.input}
        />
        <Row style={{marginTop: 20, alignSelf: 'center'}}>
          <Button onPress={addTask} style={styles.button}>
            <Text>Add</Text>
          </Button>
        </Row>
      </View>
    </View>
  );
};
