import React from 'react'
import { shallow, mount } from 'enzyme'
import Health from './index'

const mockValue = 25

it('renders Health component without crashing.', () => {
  const wrapper = shallow(<Health {...mockValue} />)
  expect(wrapper).toMatchSnapshot()
})
