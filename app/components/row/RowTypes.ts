import type {StyleProp, ViewStyle} from 'react-native';

export interface RowProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}
