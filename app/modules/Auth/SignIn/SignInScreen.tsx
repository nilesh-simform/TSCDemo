import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {styles} from './SignInStyles';
import {Button, Row} from '../../../components';
import Database from '../../../constants/Config';

const DB = Database.getDatabase();

const SignInScreen = ({navigation, setLoggedInUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Enter all fields');
      return;
    }

    DB.transaction(async tx => {
      tx.executeSql(
        'select * from users where username = ? and password = ?',
        [username, password],
        (result, set) => {
          if (set.rows.length == 0) {
            Alert.alert('Invalid Credentials');
            return;
          }

          console.log('User Logged In Successfully', result);
          Alert.alert('User Logged In Successfully');

          let obj;

          console.log('___', set.rows.item(0));
          obj = set.rows.item(0);
          tx.executeSql(
            'Insert into active_user (userId, name, mobile, role, username) values (?,?,?,?,?)',
            [obj.userId, obj.name, obj.mobile, obj.role, obj.username],
            result => {},
          );

          setUsername('');
          setPassword('');

          setLoggedInUser(obj);
        },
        e => {
          console.log('Error', e);
        },
      );
    });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={styles.inputTitle}>Username: </Text>
      <TextInput
        value={username}
        onChangeText={val => setUsername(val)}
        style={styles.textIn}
      />

      <Text style={styles.inputTitle}>Password: </Text>
      <TextInput
        value={password}
        onChangeText={val => setPassword(val)}
        style={styles.textIn}
      />

      <Row style={styles.rowStyle}>
        <Button
          onPress={() => {
            handleLogin();
          }}
          style={styles.btn}>
          <Text>Login</Text>
        </Button>
        <Text style={{marginLeft: 10}}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signUp}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </Row>
    </View>
  );
};

export default SignInScreen;
