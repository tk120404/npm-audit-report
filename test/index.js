const t = require('tap')
const nar = require('../')
nar.reporters.fake = (data, options) => ({data, options})
const fixture = require('./fixtures/index.js')

t.equal(nar.reporters.install, require('../lib/reporters/install.js'))
t.equal(nar.reporters.detail, require('../lib/reporters/detail.js'))
t.equal(nar.reporters.json, require('../lib/reporters/json.js'))
t.equal(nar.reporters.quiet, require('../lib/reporters/quiet.js'))

const fake = { reporter: 'fake' }
t.strictSame(nar({ foo: 'bar' }, fake), {
  data: { foo: 'bar' },
  options: {
    color: true,
    unicode: true,
    indent: 2,
  },
}, 'default settings')

t.strictSame(nar({ foo: 'bar', toJSON: () => ({ bar: 'baz' }) }, fake), {
  data: { bar: 'baz' },
  options: {
    color: true,
    unicode: true,
    indent: 2,
  },
}, 'should call toJSON')

t.test('install is default reporter', async t => {
  const fix = fixture('one-vuln')
  t.strictSame(nar(fix), nar.reporters.install(fix, {
    color: true,
    unicode: true,
    indent: 2,
  }))
})
