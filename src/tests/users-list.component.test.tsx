import React from "react";
import { mount } from "enzyme";

import Login from '../components/login.component'

const onClick = jest.fn();

describe('App Component', () => {
  it('Should render without errors1233', () => {
    const props = {

    }
    //@ts-expect-error
    const wrapper = mount(<Login  {...props} />)
    expect(wrapper).toBeDefined();
  });
});

