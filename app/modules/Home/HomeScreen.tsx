import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {Button, Row} from '../../components';
import {styles} from './HomeStyles';
import Database from '../../constants/Config';
import {useFocusEffect} from '@react-navigation/native';
const DB = Database.getDatabase();

const Header = ({handleLogout}) => {
  return (
    <View style={styles.header}>
      <Text numberOfLines={1} style={styles.headerText}>
        Todo List
      </Text>
      <View style={{position: 'absolute', right: 0}}>
        <Button style={{backgroundColor: 'transparent'}} onPress={handleLogout}>
          <Text style={{color: 'white', fontWeight: '900'}}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const HomeScreen = ({
  handleLogout,
  navigation,
  loggedInUser,
}) => {
  const [userTask, setUserTasks] = useState([]);

  console.log('___', userTask);

  const getTodos = () => {
    let query = 'select * from todos where userId = ?';

    if (loggedInUser?.role === 'Admin') {
      query =
        'select title, is_completed, id, name, username, users.userId from todos, users where todos.userId = users.userId';
    }

    let tasks = [];

    DB.transaction(tx => {
      tx.executeSql(
        query,
        [loggedInUser?.userId],
        (result, set) => {
          if (set.rows.length == 0) {
            return;
          }

          for (let i = 0; i < set.rows.length; i++) {
            let obj = set.rows.item(i);
            tasks.push({...obj, type: loggedInUser?.role});
          }

          setUserTasks(tasks);
        },
        e => {
          console.log('Error', e);
        },
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getTodos();
    }, []),
  );

  const markAsCompleted = (id, isCompleted) => {
    DB.executeSql(
      'update todos set is_completed = ? where id = ?',
      [isCompleted, id],
      (result, set) => {
        getTodos();
      },
      e => {
        console.log('Error', e);
      },
    );
  };

  const deleteTask = (id) => {
    DB.executeSql(
      'delete from todos where id = ?',
      [id],
      (result, set) => {
        getTodos();
      },
      e => {
        console.log('Error', e);
      },
    );
  };

  const renderList = ({item}) => {
    let username, userId;

    if (item?.type === 'Admin') {
      username = item?.username;
    }

    return (
      <View style={styles.itemContainer}>
        <Text
          style={[styles.itemTitle, item?.is_completed && styles.completedTask]}
          numberOfLines={1}>
          {item?.title} {username ? `(${username})` : ''}
        </Text>
        <Row style={styles.centeredRow}>
          <Button
            style={styles.radioContainer}
            onPress={() => markAsCompleted(item?.id, !item?.is_completed)}>
            {item?.is_completed ? <View style={styles.filledRadio} /> : <></>}
          </Button>
          <Button onPress={() => deleteTask(item?.id)} style={styles.deleteBtn}>
            <Text>Delete</Text>
          </Button>
        </Row>
      </View>
    );
  };

  const _keyExtractorFn = (item) => item?.id.toString();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header handleLogout={handleLogout} />
      <FlatList
        data={userTask}
        keyExtractor={_keyExtractorFn}
        renderItem={renderList}
      />
      {loggedInUser?.role != 'Admin' && (
        <Button
          onPress={() => {
            navigation.navigate('AddTask', {
              userId: loggedInUser?.userId,
            });
          }}
          style={styles.floaterBtn}>
          <Text style={styles.plusIcon}>+</Text>
        </Button>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
