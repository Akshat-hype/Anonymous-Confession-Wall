// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConfessionBoard {

    // ========== STRUCT ==========

    struct Confession {
        uint256 id;
        address author;
        string text;
        uint256 timestamp;
    }

    // ========== STATE VARIABLES ==========

    uint256 public confessionCount;
    Confession[] private confessions;

    // ========== EVENTS ==========

    event ConfessionCreated(
        uint256 indexed id,
        address indexed author,
        uint256 timestamp
    );

    // ========== CORE FUNCTION ==========

    function postConfession(string calldata _text) external {

        require(bytes(_text).length > 0, "Empty confession");
        require(bytes(_text).length <= 500, "Too long");

        confessionCount++;

        confessions.push(
            Confession({
                id: confessionCount,
                author: msg.sender,
                text: _text,
                timestamp: block.timestamp
            })
        );

        emit ConfessionCreated(
            confessionCount,
            msg.sender,
            block.timestamp
        );
    }

    // ========== READ FUNCTIONS ==========

    function getConfession(uint256 _id)
        external
        view
        returns (
            uint256 id,
            address author,
            string memory text,
            uint256 timestamp
        )
    {
        require(_id > 0 && _id <= confessionCount, "Invalid ID");

        Confession memory c = confessions[_id - 1];
        return (c.id, c.author, c.text, c.timestamp);
    }

    function getTotalConfessions() external view returns (uint256) {
        return confessionCount;
    }
}
