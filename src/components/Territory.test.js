import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react'
import Territory from './Territory';
import {findByAttr, findNode, findClass} from '../../testUtils'

// set up enzyme's react adapter
Enzyme.configure({ adapter: new Adapter});

const setup = (props={}) => {
    return shallow(<Territory {...props} />)
};

describe('<Territory /> component', () => {
  it('renders without error', () => {
    const wrapper = setup();
    const component = findByAttr(wrapper,"data-test","component-territory");
    expect(component.length).toBe(1);
  });
});
