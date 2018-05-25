import React from 'react'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree'
import { compose, withState, withHandlers } from 'recompose'

const theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
}

const jsonPreview = (data, length) => {
  if (!data) return 'EMPTY'
  const json = JSON.stringify(data)
  if (json.length <= length) return json
  return json.substring(0, length) + '...'
}

export const CustomizedJsonTree = props => props.data ? <JSONTree hideRoot theme={theme} {...props} /> : 'null'

export const Json = ({ data, length = 40, expanded, toggle }) =>
  <div className='addon-redux-json'>
    <div onClick={toggle}>{jsonPreview(data, length)}</div>
    { expanded ? <CustomizedJsonTree data={data} /> : null }
  </div>

const handlers = ({
  expand: ({ setExpanded }) => () => setExpanded(true),
  collapse: ({ setExpanded }) => () => setExpanded(false),
  toggle: ({ setExpanded, expanded }) => () => setExpanded(!expanded)
})

const enhance = compose(
  withState('expanded', 'setExpanded', false),
  withHandlers(handlers)
)

Json.propTypes = {
  data: PropTypes.object,
  length: PropTypes.number,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

CustomizedJsonTree.propTypes = {
  data: PropTypes.object
}

export default enhance(Json)
