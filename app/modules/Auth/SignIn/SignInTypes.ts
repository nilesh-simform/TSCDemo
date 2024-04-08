import type {ScreenNavigationProp} from '../../../navigation/AppNavigationTypes';
import type {User} from '../SignUp/SignUpTypes';

export type ComponentProp = {
  navigation: ScreenNavigationProp<'SignIn'>;
  setLoggedInUser: (user: User) => void;
};
