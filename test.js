'use strict'
import test from 'ava'
import fn from './'

test('title', async t => {
  const result = await fn('millette')
  t.truthy(result.length > 20)
  t.is(result[0].owner.login, 'millette')
})
