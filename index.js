#!/usr/bin/env node
const init = require('./utils/init')
const cli = require('./utils/cli')
const logNow = require('./utils/log')
const generate = require('./utils/generate')

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags
const start = async () => {
  console.log(cli)
  init({ clear })
  input.includes('help') && cli.showHelp(0)
  debug && logNow(flags)
  await generate()

}

start()