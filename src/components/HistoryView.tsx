import React, { FC, useState } from 'react'
import { OnDispatchEvent } from 'src/typings'
import { ACTIONS_TYPES, EVENTS, STATE_ID_HISTORY } from '../constants'
import { useAddonState, useChannel } from '@storybook/api'
import { styled } from '@storybook/theming'

const reducer = (events: OnDispatchEvent[], event: OnDispatchEvent): OnDispatchEvent[] => {
  return [...events, event]
}

const JsonCellStyle = styled.div(({ theme }) => ({
  whiteSpace: 'pre',
  height: '1.5em',
  lineHeight: '1.2em',
  overflow: 'hidden',
  paddingTop: '0.2em',
  cursor: 'pointer'
}))

const ThStyle = styled.th(({ theme }) => ({
  borderBottom: `1px solid ${theme.color.medium}`,
  textAlign: 'left',
  padding: '0.5em',
  background: theme.color.secondary,
  color: theme.color.tertiary
}))

const TdStyle = styled.td(({ theme }) => ({
  padding: '0 0.5em',
  margin: '0',
  borderBottom: `1px solid ${theme.color.medium}`,
  verticalAlign: 'top',
  whiteSpace: 'nowrap',
  lineHeight: '1.8em',
  color: theme.color.dark
}))

const TableStyle = styled.table(({ theme }) => ({
  borderCollapse: 'collapse',
  width: '100%'
}))

const Json: FC<{ data: any }> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)

  const onClick = (): void => {
    setExpanded(!expanded)
  }

  const style = {
    height: 'initial'
  }

  return (
    <JsonCellStyle style={(expanded ? style : undefined)} onClick={onClick}>
      {JSON.stringify(data, null, 2)}
    </JsonCellStyle>
  )
}

const Header: FC<{}> = () => {
  return (
    <tr>
      <ThStyle>Time</ThStyle>
      <ThStyle>Type</ThStyle>
      <ThStyle>Action</ThStyle>
      <ThStyle>Diff</ThStyle>
      <ThStyle>Previous</ThStyle>
      <ThStyle>Next</ThStyle>
      <ThStyle> </ThStyle>
    </tr>
  )
}

const s = (i: number): string => String(i)

const formatDate = (d: Date): string => {
  try {
    return s(d.getHours()) + ':' + s(d.getMinutes()) + ':' + s(d.getSeconds()) + '.' + s(d.getMilliseconds())
  } catch (err) {
    return ''
  }
}

interface RowProps extends OnDispatchEvent {
  emit: (eventName: string, ...args: any[]) => void
}

const Row: FC<RowProps> = ({ date, action, diff, prev, next, emit }) => {
  return (
    <tr>
      <TdStyle>{formatDate(date)}</TdStyle>
      <TdStyle><b>{action.type}</b></TdStyle>
      <TdStyle><Json data={action} /></TdStyle>
      <TdStyle><Json data={diff} /></TdStyle>
      <TdStyle><Json data={prev} /></TdStyle>
      <TdStyle><Json data={next} /></TdStyle>
      <TdStyle><button onClick={() => emit(EVENTS.SET_STATE, JSON.stringify(next))}>Load</button></TdStyle>
    </tr>
  )
}

const HistoryView: FC<{}> = () => {
  const [events, setEvents] = useAddonState<OnDispatchEvent[]>(STATE_ID_HISTORY, [])

  const emit = useChannel({
    [EVENTS.ON_DISPATCH]: (ev: OnDispatchEvent) => {
      if (ev.action.type === ACTIONS_TYPES.MERGE_STATE_TYPE || ev.action.type === ACTIONS_TYPES.SET_STATE_TYPE) {
        return
      }
      setEvents(events => reducer(events, ev))
    }
  })

  return (
    <TableStyle>
      <thead>
        <Header />
      </thead>
      <tbody>
        {events.map(event => <Row key={event.id} emit={emit} {...event} />)}
      </tbody>
    </TableStyle>
  )
}

export default HistoryView
