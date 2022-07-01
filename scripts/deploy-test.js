async function main() {
    const [deployer,account0, account1, account2, account3, account4, account5, account6, account7, accountFeeFactory] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Account #0:", account0.address, "balance:", (await account0.getBalance()).toString());
    console.log("Account #1:", account1.address, "balance:", (await account1.getBalance()).toString());
    console.log("Account #2:", account2.address, "balance:", (await account2.getBalance()).toString());
    console.log("Account #3:", account3.address, "balance:", (await account3.getBalance()).toString());
    console.log("Account #4:", account4.address, "balance:", (await account4.getBalance()).toString());
    console.log("Account #5:", account5.address, "balance:", (await account5.getBalance()).toString());
    console.log("Account #6:", account6.address, "balance:", (await account6.getBalance()).toString());
    console.log("Account Payees #7:", account7.address, "balance:", (await account7.getBalance()).toString());
    console.log("AccountFeeFactory:", accountFeeFactory.address, "balance:", (await accountFeeFactory.getBalance()).toString());
  
    const Iterable = await hre.ethers.getContractFactory("IterableMapping");
    const iterable = await Iterable.deploy();

    await iterable.deployed();

    const NODEReward = await hre.ethers.getContractFactory("NODERewardManagement", {
      libraries: {
        IterableMapping: iterable.address,
      },
    });
    const nodeReward = await NODEReward.deploy(40, 4, 120);

    await nodeReward.deployed();

    //console.log("Node reward deployed to:", nodeReward.address);
   
    const Factory = await hre.ethers.getContractFactory("MeerkatFactory",);
    const factory = await Factory.deploy(accountFeeFactory.address);

    await factory.deployed();

    const WETH = await hre.ethers.getContractFactory("CronosCRC20",);
    const weth = await WETH.deploy('Wrapped Ether','WETH',18);

    await weth.deployed();


    const MeerkatRouter = await hre.ethers.getContractFactory("MeerkatRouter02",);
    const meerkatRouter = await MeerkatRouter.deploy(factory.address, weth.address);

    await meerkatRouter.deployed();

    const Ldn = await hre.ethers.getContractFactory("LoadedNodesTest",);
    const ldn = await Ldn.deploy(
    [account7.address], 
    [100],
    [account1.address,account2.address,account3.address,account4.address],
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
    console.log("WETH deployed to:", weth.address);
    console.log("MeerkatRouter deployed to:", meerkatRouter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });