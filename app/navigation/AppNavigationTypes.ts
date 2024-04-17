import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import type {User} from '../modules/Auth/SignUp/SignUpTypes';

export type RootStackParam = {
  Home: {
    loggedInUser: User;
    handleLogout: () => void;
  };
  SignIn: undefined;
  SignUp: undefined;
  AddTask: {
    userId: number;
  };
};

// Generics for navigation
export type ScreenNavigationProp<T extends keyof RootStackParam> =
  StackNavigationProp<RootStackParam, T>;

export type RouteNavigationProp<T extends keyof RootStackParam> = RouteProp<
  RootStackParam,
  T
>;

export type ScreenComponentProps<T extends keyof RootStackParam> = {
  navigation: ScreenNavigationProp<T>;
  route: RouteNavigationProp<T>;
};
