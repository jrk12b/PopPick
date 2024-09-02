import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from '../../../src/components/general/Loading';

describe('Loading Component', () => {
  it('renders correctly with given props', () => {
    const {getByText} = render(<Loading />);

    // Check if the Error component is rendered
    expect(getByText('Loading...')).toBeTruthy();
  });
});
