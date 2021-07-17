import set from './set'

test('hit', () => {
  const start = { foo: [undefined, { bar: { baz: 'prev' } }] }
  const result = set(start, 'foo.1.bar.a', 'howdy')
  expect(result).toEqual({ foo: [undefined, { bar: { baz: 'prev', a: 'howdy' } }] })
})

test('do not mutate', () => {
  const input = { a: { b: 'c' } }
  const inputJson = JSON.stringify(input)
  const output = set(input, 'a.c', 'd')
  expect(JSON.stringify(input)).toEqual(inputJson)
  expect(output).toEqual({ a: { b: 'c', c: 'd' } })
})
