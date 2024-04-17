import React, {FC, useState} from 'react';
import {Alert, Keyboard, Text, TextInput, View} from 'react-native';
import {styles} from './SignUpStyles';
import {Button, Row} from '../../../components';
import Database from '../../../constants/Config';
import type {ComponentProp} from './SignUpTypes';
import type { ResultSet, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';

const DB: SQLiteDatabase = Database.getDatabase();

const SignUpScreen: FC<ComponentProp> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<number>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleRegister = (): void => {
    DB.executeSql(
      'Insert into users (name, mobile, role, username, password) values (?,?,?,?,?)',
      [name, mobileNumber, role, username, password],
      (result: Transaction) => {
        console.log('User Registered Successfully');
        Alert.alert('User Registered Successfully');

        navigation.navigate('SignIn');
      },
      e => {
        console.log('Error', e);
      },
    );

    setName('');
    setMobileNumber(undefined);
    setUsername('');
    setPassword('');
    setRole('');
    Keyboard.dismiss();
  };

  const submitHandler = async (): Promise<void> => {
    if (!name || !mobileNumber || !username || !password || !role) {
      Alert.alert('Enter all fields');
      return;
    }

    await DB.transaction(async (tx: Transaction) => {
      tx.executeSql(
        'select * from users where username = ?',
        [username],
        (result: Transaction, set: ResultSet) => {
          if (set.rows.length > 0) {
            Alert.alert('User already exists');
            return;
          }

          handleRegister();
        },
        e => {
          console.log('Error', e);
        },
      );
    });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={styles.inputTitle}>Name: </Text>
      <TextInput
        value={name}
        onChangeText={val => setName(val)}
        style={styles.textIn}
      />

      <Text style={styles.inputTitle}>Mobile Number: </Text>
      <TextInput
        value={mobileNumber?.toString()}
        onChangeText={val => {
          if (!Number.isNaN(Number(val))) {
            if (val.length <= 10) {
              setMobileNumber(Number(val));
            }
            if (val.length == 0) {
              setMobileNumber(undefined);
            }
          }
        }}
        style={styles.textIn}
      />

      <Text style={styles.inputTitle}>Role: </Text>
      <TextInput
        value={role}
        onChangeText={val => {
          setRole(val);
        }}
        style={styles.textIn}
      />

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
            submitHandler();
          }}
          style={styles.btn}>
          <Text>Register</Text>
        </Button>
      </Row>
    </View>
  );
};

export default SignUpScreen;
