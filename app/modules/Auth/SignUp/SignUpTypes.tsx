import type {ScreenNavigationProp} from '../../../navigation/AppNavigationTypes';

enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface User {
  userId: number;
  name: string;
  mobile: number;
  role: Roles;
  username: string;
  password: string;
}

export type ComponentProp = {
  navigation: ScreenNavigationProp<'SignUp'>;
};
