import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducer'
import { enhancer as withReduxEnhancer } from '../../dist/esm'

const createMiddlewareEnhancer = () => {
  const middleware = []
  return applyMiddleware(...middleware)
}

const createEnhancer = () => {
  const enhancers = []
  enhancers.push(createMiddlewareEnhancer())
  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(withReduxEnhancer)
  }
  return compose(...enhancers)
}

const store = createStore(reducer, createEnhancer())

window.top.store = store

export default store
