async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Iterable = await hre.ethers.getContractFactory("IterableMapping");
    const iterable = await Iterable.deploy();

    await iterable.deployed();

    const NODEReward = await hre.ethers.getContractFactory("NODERewardManagement", {
      libraries: {
        IterableMapping: iterable.address, 
      },
    });
    const nodeReward = await NODEReward.deploy(40, 4,120);

    await nodeReward.deployed();

    //console.log("Node reward deployed to:", nodeReward.address);
   

    const Ldn = await hre.ethers.getContractFactory("LoadedNodesTest",);
    const ldn = await Ldn.deploy(
    ['0xdD2FD4581271e230360230F9337D5c0430Bf44C0'], 
    [100],
    ['0xbDA5747bFD65F08deb54cb465eB87D40e51B197E','0x2546BcD3c84621e976D8185a91A922aE77ECEc30','0xcd3B766CCDd6AE721141F452C550Ca635964ce71','0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'],
    [300000,500000,100000,100000],
    [15,40,10,20,40],
    40,
    '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
    );

    await ldn.deployed();

    console.log("Node reward deployed to:", nodeReward.address);
    console.log("Ldn deployed to:", ldn.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });