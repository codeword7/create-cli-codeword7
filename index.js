#!/usr/bin/env node
const path = require('path')
const copy = require('copy-template-dir')
const init = require('./utils/init')
const ask = require('./utils/ask')

const start = async () => {
  init()

  const name = await ask({ message: `CLI name?`, hint: `(use kabab-case only)` })
  const description = await ask({ message: `CLI description?` })
  const version = await ask({ message: `CLI name?`, initial: `0.0.1` })
  const lincense = await ask({ message: `CLI license?`, initial: `UNLICENSED` })
  const authorName = await ask({ message: `CLI author name?` })
  const authorEmail = await ask({ message: `CLI author email?` })
  const authorUrl = await ask({ message: `CLI author url?` })

  const vars = {
    name,
    description,
    version,
    lincense,
    authorName,
    authorEmail,
    authorUrl
  }

  const inDir = path.join(__dirname, `template`)
  const outDir = path.join(process.cwd(), vars.name)

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log()
    console.log(`Creating files in ./${vars.name}`)
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath)
      console.log(`Created ${fileName}`);
    })
    console.log(`done`)
    console.log()
  })
}

start()