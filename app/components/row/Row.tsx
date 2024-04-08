import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import type {RowProps} from './RowTypes';

export const Row: FC<RowProps> = ({children, style = {}}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
