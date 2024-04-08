import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Row = ({children, style = {}}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
