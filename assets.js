const Web3 = require("web3");
const provider =
  "https://mainnet.infura.io/v3/1917d5037c034a66a32cdc9d4fd6cb12";
const web3Client = new Web3(new Web3.providers.HttpProvider(provider));
const assets =  require("./tokens.json");

// The minimum ABI to get ERC20 Token balance

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const walletAddress = "0xA10D2e55f0f87756D6f99960176120C512Eb3E15";

async function getBalance(crypto,index) {
  try {
    var contract = new web3Client.eth.Contract(minABI, crypto.address);
    var result = await contract.methods.balanceOf(walletAddress).call();
    if(result > 0){
      console.log(
          `${crypto.symbol}  ${index}  ${(result * Math.pow(10, -1 * parseInt(+crypto.decimals))).toFixed(2)}`
        );
    }
  } catch(e) {
    // console.log(crypto.symbol, index)
    console.log(`${crypto.symbol} \n` )
  } 
}



//print all curent tokens excluding liquidity pool tokens
async function getEther() {
  var contract = new web3Client.eth.getBalance(walletAddress);
  var result = await contract;
  console.log("Ethereum = " + (result * Math.pow(10, -18)).toFixed(2));
}

getEther();

console.log("Assets : ");
let count = 1;
for(let asset in assets) {
  // console.log(assets[asset].address)
  getBalance(assets[asset], count)
  count+=1
}

// var currentBlock = web3Client.eth.blockNumber;
// var n = web3Client.eth.getTransactionCount(walletAddress, currentBlock);
// var bal = web3Client.eth.getBalance(walletAddress, currentBlock);
// for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
//     try {
//         var block = web3Client.eth.getBlock(i, true);
//         if (block && block.transactions) {
//             block.transactions.forEach(function(e) {
//                 if (walletAddress == e.from) {
//                     if (e.from != e.to)
//                         bal = bal.plus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                     --n;
//                 }
//                 if (walletAddress == e.to) {
//                     if (e.from != e.to)
//                         bal = bal.minus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                 }
//             });
//         }
//     } catch (e) { console.error("Error in block " + i, e); }
// }

// class TransactionChecker {
//   constructor(address) {
//     this.address = address.toLowerCase();
//     this.web3 = new Web3(
//       "https://mainnet.infura.io/v3/1917d5037c034a66a32cdc9d4fd6cb12"
//     );
//   }

//   async checkBlock() {
//     let block = await this.web3.eth.getBlock("latest");
//     let number = block.number;
//     let transactions = block.transactions;
//     //console.log('Search Block: ' + transactions);

//     if (block != null && block.transactions != null) {
//       for (let txHash of block.transactions) {
//         let tx = await this.web3.eth.getTransaction(txHash);
//         if (this.address == tx.to.toLowerCase()) {
//           console.log(
//             "from: " +
//               tx.from.toLowerCase() +
//               " to: " +
//               tx.to.toLowerCase() +
//               " value: " +
//               tx.value
//           );
//         }
//       }
//     }
//   }
// }

// var transactionChecker = new TransactionChecker(walletAddress);
// transactionChecker.checkBlock();

///////////////////

// web3Client.eth
//     .getTransactionCount(walletAddress)
//     .then((b = console.log) => {
//       console.log(b);
//       for (var i = 0; i < b; i++) {
//         web3Client.eth.getBlock(b - i).then((Block) => {
//           a = [Block.hash];
//           console.log(a);
//           var iterator = a.values();
//           for (let elements of iterator) {
//             web3Client.eth.getTransactionFromBlock((elements)=>{
//                 console.log(elements);
//             });
//           }
//         });
//       }
//     });