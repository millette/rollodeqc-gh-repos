/*
RoLLodeQc utility to fetch repos.

Copyright 2016 Robin Millette <robin@millette.info> (<http://robin.millette.info>)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

// core
const qs = require('querystring')

// npm
const ghGot = require('gh-got')
const omitBy = require('lodash.omitby')
const rateLimit = require('rate-limit-promise')

// own
const bookworm = require('rollodeqc-gh-bookworm')
const utils = require('rollodeqc-gh-utils')

const fetchPage = (options) => ghGot(
  typeof options === 'object'
    ? `users/${options.username}/repos?` + qs.stringify(options)
    : options,
  { headers: { accept: 'application/vnd.github.drax-preview+json' } }
)

const methods = {
  getItems: (result) => result && result.body,
  updateItems: (result, inner) => {
    inner.body = result.body.concat(inner.body)
    return inner
  }
}

let limiter

const fetchLanguagesImp = (repo) => ghGot(`repos/${repo.full_name}/languages`)
  .then((x) => x.body)
  .then((x) => {
    if (Object.keys(x).length) { repo.languages = x }
    return repo
  })
  .catch(() => repo)

const fetchLanguages = (repo) => limiter()
  .then(() => fetchLanguagesImp(repo))

module.exports = (username, excludeLanguages, type) => bookworm.bookworm({
  username: username,
  type: type || 'all',
  sort: 'created',
  direction: 'asc',
  per_page: 100
}, fetchPage, methods)
  .then((x) => x.body)
  .then((x) => x
    .map((y) => utils.chosenFields(y))
    .map((y) => {
      delete y.permissions
      y.owner = { login: y.owner.login, id: y.owner.id, type: y.owner.type }
      return y
    })
    .map((y) => omitBy(y, (v) => !v))
  )
  .then((x) => excludeLanguages ? x
    : utils.rateLimit().then((rl) => {
      limiter = module.exports.setLimiter(
        5, Math.ceil(5 * ((1000 * rl.rate.reset) - Date.now()) / rl.rate.remaining))
      return Promise.all(x.map((y) => fetchLanguages(y)))
    })
  )

module.exports.clearLimiter = function () { limiter = null }

module.exports.setLimiter = function (c, t) {
  limiter = rateLimit(c, t)
  return limiter
}
