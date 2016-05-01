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

// own
const bookworm = require('rollodeqc-gh-bookworm')

module.exports = function (username, options) {
  if (typeof options !== 'object') {
    options = {
      type: 'all',
      sort: 'created',
      direction: 'asc'
    }
  }
  if (!options.per_page) { options.per_page = 100 }
  return ghGot(
    'users/${username}/repos?' + qs.stringify(options),
    { headers: { accept: 'application/vnd.github.drax-preview+json' } }
  )
}
