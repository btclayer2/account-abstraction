import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deploySimpleAccountFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()
  const network = await provider.getNetwork()
  // only deploy on local test network.
  if (network.chainId !== 11503 && network.chainId !== 11501) {
    return
  }

  // const entrypoint = await hre.deployments.get('EntryPoint')
  const ret = await hre.deployments.deploy(
    'SimpleAccountFactory', {
      from,
      args: ['0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'],
      gasLimit: 6e6,
      log: true,
      deterministicDeployment: true
    })
  console.log('==SimpleAccountFactory addr=', ret.address)
}

deploySimpleAccountFactory.tags = ['SimpleAccountFactory']

export default deploySimpleAccountFactory

/*
$ yarn deploy --tags SimpleAccountFactory --network bevmTestnet
yarn run v1.22.22
$ ./scripts/hh-wrapper deploy --tags SimpleAccountFactory --network bevmTestnet
Nothing to compile
No need to generate any newer typings.
    deploying "SimpleAccountFactory" (tx: 0xc59ebdde2ead6b9673102a1479aefd1c1b8b8ba549e81fb4ee79f914d3c83bd3)...: deployed at 0x28f5570935eeC7Ba8949552fA1A3022307bF4E6B with 3191929 gas
==SimpleAccountFactory addr= 0x28f5570935eeC7Ba8949552fA1A3022307bF4E6B
Done in 8.44s.
*/
