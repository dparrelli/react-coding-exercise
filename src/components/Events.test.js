/* eslint-env jest */
import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import App from './App'
import Events from './Events'

// jest.mock('./Events', () => function Events () {
//   return 'Events'
// })

// const mockStore = configureStore()

describe('Events component', () => {
  it('renders Total Events Found in Results Title', () => {
    // TODO: write test
  })
})
