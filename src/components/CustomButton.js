import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
