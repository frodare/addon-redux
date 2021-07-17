import get from './get'

test('hit', () => {
  expect(get({ foo: [{}, { bar: 'howdy' }] }, 'foo.1.bar')).toBe('howdy')
})

test('miss', () => {
  expect(get({ foo: [{}, { bar: 'howdy' }] }, 'fooa.6.barz')).toBe(undefined)
  expect(get({}, 'fooa.6.barz')).toBe(undefined)
  expect(get(null, 'fooa.6.barz')).toBe(undefined)
  expect(get(undefined, 'fooa.6.barz')).toBe(undefined)
  expect(get(15, 'fooa.6.barz')).toBe(undefined)
  expect(get('15', 'fooa.6.barz')).toBe(undefined)
})

test('default', () => {
  expect(get({ foo: [{}, { bar: 'howdy' }] }, 'fooa.6.barz', 'hi')).toBe('hi')
})
