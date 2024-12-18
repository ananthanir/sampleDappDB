// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract DataStoreMul {
    string[][] stringArray;
    mapping(string => string[][]) stringMap;

    mapping(string => uint) datacount; // examno => count
    mapping(string => uint[2]) public eventcount; // examno => [start, end]

    event Datas(string indexed examno, string[] data);

    function storeData(string[][] memory newStrings) public {
        stringArray = newStrings;
    }

    function storeDatas(string[][] memory newStrings) public {

        for (uint i = 0; i < newStrings.length; i++) {
            stringArray.push(newStrings[i]);
            emit Datas(newStrings[i][3], newStrings[i]);
        }
    }

    function storeDataMap(string[][] memory newStrings) public {
        for (uint i = 0; i < newStrings.length; i++) {
            stringMap[newStrings[i][3]].push(newStrings[i]);
            emit Datas(newStrings[i][3], newStrings[i]);

            if (eventcount[newStrings[i][3]][0] == 0 && eventcount[newStrings[i][3]][1] == 0) {
                eventcount[newStrings[i][3]][0] = block.number;
                eventcount[newStrings[i][3]][1] = block.number;
            } else {
                eventcount[newStrings[i][3]][1] = block.number;
            }
        }
    }

    function getDataArray(uint index) public view returns (string[] memory) {
        return stringArray[index];
    }

    function getDataMap(
        string memory examno, uint start, uint number
    ) public view returns (string[][] memory) {
        string[][] storage data = stringMap[examno];
        require(start + number <= data.length, "Out of bounds");

        string[][] memory batch = new string[][](number);
        for (uint i = 0; i < number; i++) {
            batch[i] = data[start + i];
        }
        return batch;
    }

    function getAllData() public view returns (string[][] memory) {
        return stringArray;
    }
}
