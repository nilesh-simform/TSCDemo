import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants';
import type {ButtonProp} from './ButtonTypes';

export const Button: FC<ButtonProp> = ({
  onPress = () => {},
  children,
  style = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
