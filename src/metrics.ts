const { getAllFiles } = require('get-all-files')
const { SolidityMetricsContainer } = require('solidity-code-metrics')

const options = {
  basePath: '',
  inputFileGlobExclusions: undefined,
  inputFileGlob: undefined,
  inputFileGlobLimit: undefined,
  debug: false,
  repoInfo: {
    branch: undefined,
    commit: undefined,
    remote: undefined,
  },
}

const metrics = new SolidityMetricsContainer('metricsContainerName', options)

async function run() {
  var contractsPath = process.argv.slice(2)[0]
  const files = await getAllFiles(contractsPath).toArray()

  const skipFiles = [
    'interfaces/',
    'tests/',
    'contracts/IndexManager.sol',
    'contracts/PEAS.sol',
    'contracts/V3Locker.sol',
  ]

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    let shouldSkip = false

    for (let j = 0; j < skipFiles.length; j++) {
      if (file.includes(skipFiles[j])) {
        shouldSkip = true
        break
      }
    }

    if (shouldSkip) {
      console.info('skipping', file)
      continue
    }

    console.info(i, file)
    await metrics.analyze(files[i])
  }

  console.info('contract,source,total,comment')
  for (let i = 0; i < metrics.metrics.length; i++) {
    const metric = metrics.metrics[i]

    console.info(
      [
        metric.filename,
        metric.metrics.nsloc.source,
        metric.metrics.nsloc.total,
        metric.metrics.nsloc.comment,
      ].join(',')
    )
  }

  console.info('source count:', metrics.totals().totals.nsloc)
}

run()
