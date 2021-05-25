#!/usr/bin/env node

/**
 * cli-name
 * cwhwicwi
 * 
 * @author codeword7 <>
 */

const init = require('./utils/init')
const cli = require('./utils/cli')
const log = require('./utils/log')

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

const start = async () => {
  init({ clear })
  input.include(`help`) && cli.showHelp(0)

  debug && log(flags)
}

start()