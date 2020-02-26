import React from 'react'
import { shallow, mount } from 'enzyme'
import MachineDetails from './index'
import store from '../../store'
import { Provider } from 'react-redux'

it('renders MachineDetails component without crashing.', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <MachineDetails />
    </Provider>)
  expect(wrapper).toMatchSnapshot()
})
