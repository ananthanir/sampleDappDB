// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract DataStoreMul {
    string[][] stringArray;

    struct eventinfo {
        uint start;
        uint end;
        bool firstentry;        
    }

    string public data1;

    function setData1(string memory _data1) public {
        data1 = _data1;
    }

    mapping(string => string[][]) stringMap;

    mapping(string => uint) datacount; // examno => count
    mapping(string => eventinfo) public eventcount; // examno => [start, end]

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
            eventcount[newStrings[i][3]].end = block.number;

            if (!eventcount[newStrings[i][3]].firstentry) {
                eventcount[newStrings[i][3]].start = block.number;
                eventcount[newStrings[i][3]].firstentry=true;
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
