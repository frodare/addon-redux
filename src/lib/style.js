const styles = `

.addon-redux {
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif;
  font-size: 14px;
  color: #444;
  width: 100%;
}

.addon-redux-disabled {
  width: 100%;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  display: inline;
  text-align: center;
  color: rgb(190, 190, 190);
  padding: 10px;
  text-transform: uppercase;
}

.addon-redux textarea {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  border: 0;
  background-color: #f7f7f7;
  color: #4c4c4c;
  border-bottom: 1px solid #ececec;
  resize: vertical;
}

.addon-redux-no-actions {
  margin-left: 1em;
  font-size: 11px;
  font-weight: bold;
  color: #aaa;
}

.addon-redux-button-bar {
  padding: 0.5em 0;
  color: #777;
  border-bottom: 1px solid #ccc;
  width: 100%;
}

.addon-redux button {
  margin: 0.25em 0.5em;
}

.addon-redux-history-panel {
  border-collapse: collapse;
  width: 100%;
}

.addon-redux-history-panel button {
  margin: 0;
  line-height: 1em;
}

.addon-redux-json {
  cursor: pointer;
  color: rgb(38, 100, 128);
}

.addon-redux-state-panel .addon-redux-json {
  margin: 0.5em;
}

.addon-redux-history-panel th {
  text-align: left;
  text-transform: uppercase;
  font-size: 11px;
  border-bottom: 1px solid #ccc;
  padding: 0 0.5em;
  color: #777;
  background-color: #f7f7f7;
}

.addon-redux-history-panel th input {
  width: 100%;
  border: none;
  padding: 0.5em;
  box-sizing: border-box;
  font-size: 11px;
  font-weight: bold;
  background: transparent;
}

.addon-redux-filter-row {
  /* background: #f7f7f7; */

}

.addon-redux-history-panel td {
  vertical-align: top;
  border-bottom: 1px solid #eee;
  padding: 0.5em;
}


`

const styleNode = document.createElement('style')
styleNode.id = 'addon-redux'
styleNode.innerHTML = styles
document.head.appendChild(styleNode)
