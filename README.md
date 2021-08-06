![Redux Addon](docs/addon-redux-header.png)

`addon-redux` is a [Storybook](https://storybook.js.org) addon that helps when building stories using components that use redux state.

Ideally stories are only needed for non-redux connected components, not containers.  However, when writing stories for components of a redux application, it is common for the components to have conatiners as children which causes problems.  This is where `addon-redux` helps out by providing a decorator and helpful panels to support container components.


This documentation is for version 2, [click here](docs/v1/README.md) for information on setting up version 1.



![Redux Addon State Panel](docs/v2/addon-redux-state-panel.png?v=1)

[__Demo__](https://github.com/frodare/addon-redux-example) project using the Redux Addon.

This addon is compatible with Storybook for React

# Features

- Add two panels to Storybook: Redux State and Redux History
- Wraps stories with a React Redux Provider component
- View and Edit the current state of the store
- Resets redux to initial state when switching stories
- Provides a story parameter to update the store on story load
- Logs actions and maintains the time, action, previous state, next state and state diff
- Supports time travel to previous states

# Install

```
npm install addon-redux
```

# Usage

In order for the React Redux addon to function correctly:
- it must be [registered](#register) as a Storybook addon
- its store [enhancer](#enhancer) must be used in the app's store
- the store must be [imported](#import-the-store-previewjs) in preview.js

## Register

Similar to other Storybook addons, the Redux Addon needs to be registered with storybook before use.

```js
// .storybook/main.js
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "addon-redux"
  ]
}
```

## Enhancer

To give the Redux Addon the ability to listen to and alter the store, its enhancer must be used when creating the store as shown below.

```js
// Simplest use of the Redux Addon Enhancer
import { createStore, compose } from 'redux'
import reducer from './your/reducer'
import { enhancer } from 'addon-redux'

export const store = createStore(reducer, {}, enhancer)
```

Usually the store of an application will already be using enhancers. A more realistic store setup for the Redux Addon is shown below.
It includes the commonly used middleware enhancer along with some middlewares for demonstration.
This example shows how the Redux enhancer can be used with other enhancers, although the store creation code can look very different between different applications.

```js
// Realistic use of the Redux Addon Enhancer with other store enhancers
import { createStore, compose, applyMiddleware } from 'redux'
import { enhancer as withReduxEnhancer } from 'addon-redux'
import reducer from './your/reducer'
import createMiddlewareEnhancer from './middlewareEnhancer'
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
  const enhancers = []
  enhancers.push(createMiddlewareEnhancer())
  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(withReduxEnhancer)
  }
  return compose(...enhancers)
}

const store = createStore(reducer, createEnhancer())

export default store
```

## Import the Store (Preview.js)

The store must be imported in `./storybook/preivew.js` so that it will be setup and ready for the stories. 
This addon will automatically wrap stories with the Redux provider as long as the enhancer has been setup as shown above.

```js
// .storybook/preview.js
const store = require('./your/store')

module.exports = {
  decorators: []
}
```

![Redux Addon History Panel](docs/v2/addon-redux-history-panel.png?v=1)

## Args

Further control of the redux state is provided using [storybook args](https://storybook.js.org/docs/react/writing-stories/args). Args can be linked to the redux store using the `ARG_REDUX_PATH` key in the `argTypes` key of the default CSF export. The value of the `ARG_REDUX_PATH` is a dot delimited string representing the path that the arg corresponds to in the store. Integer segments are treated as array indices.

```js
import React from 'react'
import App from './App'
import { ARG_REDUX_PATH } from 'addon-redux'

export default {
  title: 'App',
  component: App,
  argTypes: {
    name1: {
      control: { type: 'text' },
      [ARG_REDUX_PATH]: 'todos.0.text'
    }
  }
};

const Template = (args) => <App />;

export const All = Template.bind({});
All.args = {
  name1: 'First Value',
  completed1: false
};
```

## Parameters

`addon-redux` currently supports one [storybook parameter](https://storybook.js.org/docs/react/writing-stories/parameters) that can be used to change the redux state on story load, `PARAM_REDUX_MERGE_STATE`.  This parameter takes a JSON string or object that will be parsed and spread on top of the current store's state.

```js
// example story using PARAM_REDUX_MERGE_STATE
import React from 'react'
import MyComponent from './MyComponent'
import { PARAM_REDUX_MERGE_STATE } from 'addon-redux'

export default {
  title: 'MyComponent',
  component: MyComponent,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: '{"foo": {"bar": "baz"}}'
  }
};

const Template = (args) => <MyComponent {...args} />;

export const All = Template.bind({});
All.args = {};
```

