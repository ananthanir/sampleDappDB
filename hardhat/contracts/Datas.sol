// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract DataStoreMul {
    string[][] stringArray;

    event Datas(string index, string[]);

    function storeData(string[][] memory newStrings) public {
        stringArray = newStrings;
    }

    function storeDatas(string[][] memory newStrings) public {
        for (uint i = 0; i < newStrings.length; i++) {
            stringArray.push(newStrings[i]);
            emit Datas(newStrings[i][1], newStrings[i]);
        }
    }

    function getData(uint index) public view returns (string[] memory) {
        return stringArray[index];
    }

    function getAllData() public view returns (string[][] memory) {
        return stringArray;
    }
}