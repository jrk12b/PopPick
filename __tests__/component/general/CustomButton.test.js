import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../../src/components/general/CustomButton';

describe('CustomButton Component', () => {
  it('renders correctly with given props', () => {
    const {getByText} = render(
      <CustomButton title="Click Me" onPress={() => {}} />,
    );

    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const mockOnPress = jest.fn(); // Create a mock function
    const {getByText} = render(
      <CustomButton title="Click Me" onPress={mockOnPress} />,
    );

    // Simulate a press event
    fireEvent.press(getByText('Click Me'));

    // Assert that the onPress function was called
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('applies custom styles correctly', () => {
    const customButtonStyle = {backgroundColor: 'blue'};
    const customTextStyle = {color: 'white'};

    const {getByText} = render(
      <CustomButton
        title="Click Me"
        onPress={() => {}}
        style={customButtonStyle}
        textStyle={customTextStyle}
      />,
    );

    const text = getByText('Click Me');
    expect(text.props.style).toEqual(customTextStyle);
  });
});
