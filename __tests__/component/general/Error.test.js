import React from 'react';
import {render} from '@testing-library/react-native';
import Error from '../../../src/components/general/Error';

describe('Error Component', () => {
  it('renders correctly with given props', () => {
    const {getByText} = render(<Error message="This is an error" />);

    // Check if the Error component is rendered
    expect(getByText('Error: This is an error')).toBeTruthy();
  });

  it('renders correctly with a different error message', () => {
    const {getByText} = render(<Error message="Another error occurred" />);

    // Check if the Error component is rendered with the new message
    expect(getByText('Error: Another error occurred')).toBeTruthy();
  });
});
