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
   
    const Factory = await hre.ethers.getContractFactory("MeerkatFactory",);
    const factory = await Factory.deploy('0x5362F46cabcaF813e17A6E44C4DB7286DCDf08cd');

    await factory.deployed();


    const MeerkatRouter = await hre.ethers.getContractFactory("MeerkatRouter02",);
    const meerkatRouter = await MeerkatRouter.deploy(factory.address, '0x1E66e48DCA96eDc2BEB980a0CC3bd1c578BDf1cF');

    await meerkatRouter.deployed();

    const Ldn = await hre.ethers.getContractFactory("LoadedNodesTest",);
    const ldn = await Ldn.deploy(
    ['0xdD2FD4581271e230360230F9337D5c0430Bf44C0'], 
    [100],
    ['0x4F30fC4E8a506BfB8e387beBA18D18Bc2d5B0e01','0x191E58fb6bD15dE0B3aB684C03fA7EE8371A5b6c','0xd0cEB79953C9175170473ada090E26259A612047','0x0A4035022Dc34fD77c0cD0bb7694120DB41f15eF'],
    [300000,500000,100000,100000],
    [15,40,10,20,40],
    40,
    meerkatRouter.address
    );

    await ldn.deployed();




    console.log("Node reward deployed to:", nodeReward.address);
    console.log("Iterable deployed to:", iterable.address);
    console.log("Ldn deployed to:", ldn.address);
    console.log("Factory deployed to:", factory.address);
    console.log("MeerkatRouter deployed to:", meerkatRouter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });