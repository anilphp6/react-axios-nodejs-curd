import React from "react";
import { mount, shallow } from "enzyme";

import Login from '../components/login.component'

const onClick = jest.fn();

describe('App Component', () => {
  it('renders correctly', () => {
    const props = {
    }
    //@ts-expect-error
    const wrapper = shallow(<Login  {...props} />)
    expect(wrapper).toMatchSnapshot()
  });
});

