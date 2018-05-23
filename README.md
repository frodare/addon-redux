# Storybook Redux Addon

---

Storybook Redux Addon aids in using redux backed components in your stories in [Storybook](https://storybook.js.org).

This addon is compatible with Storybook for React

# Features

- Add two panels to Storybook: Redux State and Redux History
- Wraps stories with a React Redux Provider component
- View and Edit the current state of the store
- Provides Canned Action buttons which can dispatch predefined actions
- Logs actions and maintains the time, action, previous state, next state and state diff
- Supports time travel to previous states
- Filter actions entries by action and state diff

# Install

```
npm install --save-dev addon-redux
```

# Usage

In order for the React Redux addon to function correctly:
- it must be [registered](#register) as a Storybook addon
- its store [enhancer](#enhancer) must be used in the provided store
- the [withRedux](#decorator-withredux) decorator must be used in the story

## Register

Similar to other Storybook addons, the Redux Addon needs to be registered with storybook before use.
However, the Redux Addon also requires the `addons` module as shown below.

```js
// .storybook/addons.js
import addons from '@storybook/addons'
import registerRedux from 'addon-redux/register'
registerRedux(addons)
```

## Enhancer

To give the Redux Addon the ability to listen to and alter the store, its enhancer must be used when creating the store as shown below.

```js
// Simplest use of the Redux Addon Enhancer
import { createStore, compose } from 'redux'
import reducer from './your/reducer'
import withReduxEnhancer from 'addon-redux/enhancer'

const store = createStore(reducer, withReduxEnhancer)

export default store
```

Usually the store of an application will already be using enhancers. A more realistic store setup for the Redux Addon is shown below.
It includes the commonly used middleware enhancer along with some middlewares for demonstration.
This example shows how the Redux enhancer can be used with other enhancers, although the store creation code can look very different between different applications.

```js
// Realistic use of the Redux Addon Enhancer
import { createStore, compose } from 'redux'
import reducer from './your/reducer'
import createMiddlewareEnhancer from './middlewareEnhancer'
import withReduxEnhancer from 'addon-redux/enhancer'
import { applyMiddleware } from 'redux'
import invariant from 'redux-immutable-state-invariant'
import logger from 'redux-logger'

createMiddlewareEnhancer () => {
  const middleware = []
  if (process.env.NODE_ENV !== 'production') {
    // include other middlewares as needed, like the invariant and logger middlewares
    middleware.push(invariant())
    middleware.push(logger())
  }
  return applyMiddleware(...middleware)
}

const createEnhancer = () => {
  let enhancer = createMiddlewareEnhancer()
  if (process.env.NODE_ENV !== 'production') enhancer = compose(enhancer, withReduxEnhancer)
  // include any other enhancers as needed
  return enhancer
}

const store = createStore(reducer, createEnhancer())

export default store
```

## Decorator (withRedux)

The Redux Addon provides a decorator that wraps stories with a react redux provider component.
The provided withRedux method is a factory that requires storybook's `addons` module.
The result then needs to be invoked with the redux addon settings for the story.
There are currently three supported settings: __store__, __state__, and __actions__.

```js
import React from 'react'
import { storiesOf } from '@storybook/react'
import addons from '@storybook/addons'
import withRedux from 'addon-redux/withRedux'
import store from './your/store'
import Container from './your/container'

const withReduxSettings = {
  store,
  state: {optional: 'state to merge on start'},
  actions: [{name: 'Demo Action', action: {type: 'test'}}]
}

const withReduxDecorator = withRedux(addons)(withReduxSettings)

const stories = storiesOf('Demo', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withReduxDecorator)
stories.add('default', () => <Container />
```

### Store Setting
The __store__ setting is required and should be set with the store of your application.
To function properly, the store must be built including the [enhancer](#enhancer) provided with the Redux Addon.

### State Setting
The __state__ setting is optional. Use it if the default state returned from the store's reducers is not ideal or can be improved for the story.
The object set to the __store__ setting will be merged on top of the default store's state when the story loads.

### Canned Actions Setting
The __actions__ setting is optional. Use it to set canned (predefined) actions that are useful to test the story's component.
The setting takes an array of canned action objects which contain a name and action key.
A button will be appended to the Redux State Panel for each canned action object in the array.
The name key is used as the label of a button.
The action key holds the action object that will be dispatched when the canned action button is clicked.

```js
// Canned Action Object
{
  name: 'Test Action',
  action: {
    type: 'test_action_type',
    date: 'action data'
  }
}

```
