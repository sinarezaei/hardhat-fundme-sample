const hre = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log(`Verifying contract ${contractAddress}`);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("Verified Contract!");
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
      throw e;
    }
  }
};

module.exports = { verify };
