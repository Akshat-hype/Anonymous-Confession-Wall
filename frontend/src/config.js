export const CONTRACT_ADDRESS = "0xa86941Ac459348e79d03271881db859aC919B0a6";

export const CONTRACT_ABI = [
  "function postConfession(string calldata _text) external",
  "function getTotalConfessions() external view returns (uint256)",
  "function getConfession(uint256 _id) external view returns (uint256 id, address author, string memory text, uint256 timestamp)"
];
