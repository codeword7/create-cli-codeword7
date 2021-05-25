const path = require('path')
const execa = require('execa')
const ora = require('ora');
const copy = require('copy-template-dir')
const alert = require('cli-alerts-codeword7');
const { green: g, dim: d, yellow: y } = require('chalk')
const questions = require('./questions')

const spinner = ora({ text: '' })

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

    console.log();
    spinner.start(
      `${y(`DEPENDENCIES`)} installing…\n\n${d(`It may take moment…`)}`
    );
    process.chdir(outDir)
    const pkgs = [
      `meow@9.0.0`,
      `chalk@latest`,
      `cli-alerts-codeword7@latest`,
      `cli-welcome@latest`,
      `cli-meow-help@latest`,
      `cli-handle-error@latest`,
      `cli-handle-unhandled@latest`
    ];
    await execa(`npm`, [`install`, ...pkgs]);
    await execa(`npm`, [`install`, `prettier`, `-D`]);
    await execa(`npm`, [`dedupe`])
    spinner.succeed(`${g(`DEDUPE`)} ran`)

    alert({
      type: `success`,
      name: `All Done`,
      msg: `\n\n${createdFiles.length} files created in ${d(`./${output}`)} directory`
    })
  })
}