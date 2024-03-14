async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Contract = await ethers.getContractFactory(process.env.CONTRACT_NAME)
  // contract constructor arguments can be passed as parameters in #deploy
  // await Contract.deploy(arg1, arg2, ...)
  // TODO: make configurable through CLI params
  const contract = await Contract.deploy(
    // // Mainnet: Adapter
    // '0x02f92800F57BCD74066F5709F1Daa1A4302Df875',
    // '0x1a44076050125825900e736c501f859c50fe728c',
    // '0x21FE3e26E824783cA7E374355A8D30Ae8BBf6E37'

    // Arbitrum One: IndirectOFT
    '0x02f92800F57BCD74066F5709F1Daa1A4302Df875',
    '0x1a44076050125825900e736c501f859c50fe728c',
    '0x21FE3e26E824783cA7E374355A8D30Ae8BBf6E37'
  )

  console.log('Contract address:', contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
