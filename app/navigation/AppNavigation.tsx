import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../modules/Auth/SignIn/SignInScreen';
import SignUpScreen from '../modules/Auth/SignUp/SignUpScreen';
import HomeScreen from '../modules/Home/HomeScreen';
import Database from '../constants/Config';
import {AddTask} from '../modules/AddTask/AddTaskScreen';
import type {User} from '../modules/Auth/SignUp/SignUpTypes';
import type {RootStackParam, ScreenComponentProps} from './AppNavigationTypes';
import type {SQLiteDatabase} from 'react-native-sqlite-storage';

const Stack = createStackNavigator<RootStackParam>();

const DB: SQLiteDatabase = Database.getDatabase();

function AppContainer() {
  const [loggedInUser, setLoggedInUser] = useState<User>();

  const getLoggedInData = async (): Promise<void> => {
    DB.transaction(tx => {
      tx.executeSql('select * from active_user', [], (result, set) => {
        if (set.rows.length == 0) {
          return;
        }
        console.log('___', set.rows.item(0));

        setLoggedInUser(set.rows.item(0));
      });
    });
  };

  const handleLogout = (): void => {
    setLoggedInUser(undefined);

    DB.transaction(tx => {
      tx.executeSql('delete from active_user');
    });
  };

  useEffect(() => {
    getLoggedInData();
  }, []);

  const AddTaskComponent = (props: ScreenComponentProps<'AddTask'>) => (
    <AddTask {...props} />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={(props: ScreenComponentProps<'Home'>) => {
                return (
                  <HomeScreen
                    {...props}
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                  />
                );
              }}
            />
            <Stack.Screen name="AddTask" component={AddTaskComponent} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={(props: ScreenComponentProps<'SignIn'>) => (
                <SignInScreen {...props} setLoggedInUser={setLoggedInUser} />
              )}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
