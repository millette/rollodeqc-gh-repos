# rollodeqc-gh-repos
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-repos.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-repos)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-repos/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-repos?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-repos.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-repos)
> RoLLodeQc utility to fetch repos.

## Install
```
$ npm install --save rollodeqc-gh-repos
```

## Usage
```js
const rollodeqcGhRepos = require('rollodeqc-gh-repos');

rollodeqcGhRepos('millette');
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhRepos(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## CLI
```
$ npm install --global rollodeqc-gh-repos
```

```
$ rollodeqc-gh-repos --help

  Usage
    rollodeqc-gh-repos [input]

  Options
    --exclude-languages  Don\'t fetch languages. [Default: false]

  Examples
    $ rollodeqc-gh-repos
    unicorns & rainbows
    $ rollodeqc-gh-repos ponies
    ponies & rainbows
```


## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)
