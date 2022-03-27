const fs = require('fs');

const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log('Deploying contracts with account: ', deployer.address)
  console.log('Account balance: ', accountBalance.toString())

  const Token = await hre.ethers.getContractFactory('WavePortal')
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  })
  await portal.deployed()

  console.log('WavePortal address: ', portal.address)
  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${portal.address}"
  export const ownerAddress = "${portal.signer.address}"
  `)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
