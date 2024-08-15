import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

/**
 * CustomButton Component
 *
 * A customizable button component that can be used throughout the application.
 * This component wraps the standard React Native `TouchableOpacity` and `Text` components
 * to provide a reusable button with customizable styles and behavior.
 *
 * Props:
 * - title: string - The text to be displayed inside the button.
 * - onPress: function - A callback function that is called when the button is pressed.
 * - style: object - Custom styles for the button container, passed to `TouchableOpacity`.
 * - textStyle: object - Custom styles for the button text, passed to `Text`.
 *
 * Behavior:
 * - The `TouchableOpacity` component is used to create a pressable button. The `onPress` prop
 *   is triggered when the button is pressed, executing the provided callback function.
 * - The `style` prop is applied to the `TouchableOpacity` to customize the button's appearance.
 * - The `textStyle` prop is applied to the `Text` component to style the button's text.
 *
 * Usage:
 * - The `CustomButton` component can be used wherever a button is needed in the app.
 * - You can pass different styles to `style` and `textStyle` props to adjust the button's
 *   appearance according to the design requirements.
 */
const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
