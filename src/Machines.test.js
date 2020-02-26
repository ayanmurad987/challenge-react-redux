import React from 'react'
import { shallow, mount } from 'enzyme'
import Machines from './Machines'
import { Provider } from 'react-redux'
import store from './store'

it('renders Machines component without crashing.', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Machines />
    </Provider>)
  expect(wrapper).toMatchSnapshot()
})
