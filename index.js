#!/usr/bin/env node
const path = require('path')
const copy = require('copy-template-dir')
const alert = require('cli-alerts-codeword7');
const { green: g, dim: d } = require('chalk')
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
  const output = vars.name
  const inDir = path.join(__dirname, `template`)
  const outDir = path.join(process.cwd(), output)

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log(d(`\nCreating files in ${g(`./${output}`)} directory:\n`))
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath)
      console.log(`${g(`CREATED`)} ${fileName}`);
    })
    alert({
      type: `success`,
      name: `All Done`,
      msg: `\n\n${createdFiles.length} files created in ${d(`./${output}`)} directory`
    })
  })
}

start()