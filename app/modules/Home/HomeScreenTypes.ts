import type {ScreenNavigationProp} from '../../navigation/AppNavigationTypes';
import type {User} from '../Auth/SignUp/SignUpTypes';

export interface CommonTaskListProp {
  id: number;
  title: string;
  is_completed: boolean;
}

// Extending Interface
export interface UserTaskListProp extends CommonTaskListProp {
  type: 'User';
}

export interface AdminTaskListProp extends CommonTaskListProp {
  type: 'Admin';
  username: string;
  userId: number;
}

// Union Type
export type Task = UserTaskListProp | AdminTaskListProp;

export interface HomeScreenProps {
  handleLogout: () => void;
  navigation: ScreenNavigationProp<'Home'>;
  loggedInUser: User;
}

// Utitlity Functions
export type HeaderProps = Pick<HomeScreenProps, 'handleLogout'>;
