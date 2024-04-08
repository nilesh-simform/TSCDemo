import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../modules/Auth/SignIn/SignInScreen';
import SignUpScreen from '../modules/Auth/SignUp/SignUpScreen';
import HomeScreen from '../modules/Home/HomeScreen';
import Database from '../constants/Config';
import {AddTask} from '../modules/AddTask/AddTaskScreen';

const Stack = createStackNavigator();

const DB = Database.getDatabase();

function AppContainer() {
  const [loggedInUser, setLoggedInUser] = useState();

  const getLoggedInData = async () => {
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

  const handleLogout = () => {
    setLoggedInUser(undefined);

    DB.transaction(tx => {
      tx.executeSql('delete from active_user');
    });
  };

  useEffect(() => {
    getLoggedInData();
  }, []);

  const AddTaskComponent = (props) => (
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
              component={(props) => {
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
              component={(props) => (
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
