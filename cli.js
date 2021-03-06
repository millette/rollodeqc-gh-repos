#!/usr/bin/env node

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

// npm
const meow = require('meow')
const updateNotifier = require('update-notifier')

updateNotifier({ pkg: require('./package.json') }).notify()

// self
const rollodeqcGhRepos = require('./')

const cli = meow(`
  Usage
    $ rollodeqc-gh-repos [username]

  Options
    --exclude-languages  Don't fetch languages. [Default: false]

  Examples
    $ rollodeqc-gh-repos
    unicorns & rainbows
    $ rollodeqc-gh-repos ponies
    ponies & rainbows
`, {
  boolean: true
})

const excludeLanguages = cli.flags.excludeLanguages

var running = true

rollodeqcGhRepos(cli.input[0] || 'millette', excludeLanguages)
  .then((x) => {
    console.log(JSON.stringify(x, null, ' '))
    running = false
  })
  .catch((e) => {
    console.log('Oh my...', e)
    running = false
  })

if (!excludeLanguages) {
  const isDone = function isDone (w) {
    if (!w) { w = 300 }
    setTimeout(() => {
      if (running) { isDone(w) }
    }, w)
  }
  isDone()
}
