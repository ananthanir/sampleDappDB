// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract DatalStoreMu {
    string[][] stringArray;

    struct eventinfo {
        uint start;
        uint end;
        bool firstentry;        
    }

    mapping(string => eventinfo) public eventcount; // examno => [start, end]

    event Datas(string examno, string data);
    
    // input: [examno, othervalues]
    // exaple: ["NEW", "kuqhCsiJ,yIVgSsOGqZISBEAvsKBGJDCH,ST,b,d,b,d,b,b,c,b,d,b,1415256174"]
    function storeData(string[][] memory newStrings) public {
        for (uint i = 0; i < newStrings.length; i++) {
            emit Datas(newStrings[i][0], newStrings[i][1]);
            eventcount[newStrings[i][0]].end = block.number;

            if (!eventcount[newStrings[i][0]].firstentry) {
                eventcount[newStrings[i][0]].start = block.number;
                eventcount[newStrings[i][0]].firstentry=true;
            }
        }
    }

}
