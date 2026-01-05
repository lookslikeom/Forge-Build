import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById("web3-form");
const input = document.getElementById("input");
const output = document.getElementById("output");
const txHashText = document.getElementById("hash");
const submitBtn = document.getElementById("submit-btn");
const getBtn = document.getElementById("get-btn");

const contractAddress = "0x32A55a22BBE7EE2E7952bfC1397eDb1Ef56e06EF";

const abi = [
  "function set(uint256 num)",

  "function get() view returns (uint256)",
];

let provider;
let signer;
let contract;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.innerText = "Uploading...";
  await setValue(input.value);
  submitBtn.innerText = "Upload Successful";
});

getBtn.addEventListener("click", async () => {
  getBtn.innerText = "Getting...";
  await getValue();
  getBtn.innerText = "Successful";
});

async function connectContract() {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
}

async function setValue(num) {
  await connectContract();
  const tx = await contract.set(num);
  txHashText.innerText = `Transaction Hash: ${tx.hash}`;
  await tx.wait();
}

async function getValue() {
  await connectContract();
  const value = await contract.get();
  output.innerText = value.toString();
}
