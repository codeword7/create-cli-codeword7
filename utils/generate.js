const path = require('path')
const execa = require('execa');
const copy = require('copy-template-dir')
const alert = require('cli-alerts-codeword7');
const { green: g, dim: d } = require('chalk')
const questions = require('./questions')


module.exports = async () => {
  const vars = await questions()
  const output = vars.name
  const inDir = path.join(__dirname, `../template`)
  const outDir = path.join(process.cwd(), output)

  copy(inDir, outDir, vars, async (err, createdFiles) => {
    if (err) throw err;
    console.log(d(`\nCreating files in ${g(`./${output}`)} directory:\n`))
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath)
      console.log(`${g(`CREATED`)} ${fileName}`);
    })

    process.chdir(outDir)
    await execa(`npm`, [`dedupe`])
    alert({
      type: `success`,
      name: `All Done`,
      msg: `\n\n${createdFiles.length} files created in ${d(`./${output}`)} directory`
    })
  })
}