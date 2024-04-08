import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

export interface ButtonProp {
  children: JSX.Element[] | JSX.Element;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}
