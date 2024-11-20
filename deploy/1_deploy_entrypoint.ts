import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { Create2Factory } from '../src/Create2Factory'
import { ethers } from 'hardhat'

const deployEntryPoint: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()
  await new Create2Factory(ethers.provider).deployFactory()

  console.log('before nonce =', await provider.getTransactionCount(from))

  const ret = await hre.deployments.deploy(
    'EntryPoint', {
      from,
      args: [],
      gasLimit: 6e6,
      deterministicDeployment: true
    })
  console.log('==entrypoint addr=', ret.address)
  console.log('after nonce =', await provider.getTransactionCount(from))

    /*
      const entryPointAddress = ret.address
      const w = await hre.deployments.deploy(
        'SimpleAccount', {
          from,
          args: [entryPointAddress, from],
          gasLimit: 2e6,
          deterministicDeployment: true
        })

      console.log('== wallet=', w.address)

      const t = await hre.deployments.deploy('TestCounter', {
        from,
        deterministicDeployment: true
      })
      console.log('==testCounter=', t.address)
      */
}

deployEntryPoint.tags = ['EntryPoint']

export default deployEntryPoint

/*
$ yarn deploy --tags EntryPoint  --network dev
yarn run v1.22.22
$ ./scripts/hh-wrapper deploy --tags EntryPoint --network dev
Nothing to compile
No need to generate any newer typings.
Deploying from: 0xcAF084133CBdBE27490d3afB0Da220a40C32E307
==entrypoint addr= 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
Done in 5.62s.
* */