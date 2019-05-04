// get: /api/speedcube/speedcube/users/scott/overview
export function userFixture() {
    return {  
        "status":"success",
        "records":[  
            {  
                "id":2,
                "solveId":5,
                "userId":53,
                "createdAt":"2019-03-07 01:04:06",
                "updatedAt":"2019-03-07 01:04:06",
                "solve":{  
                    "id":5,
                    "createdAt":"2019-03-07 01:03:52",
                    "scrambleId":16,
                    "time":11837,
                    "scramble":{  
                        "id":16,
                        "puzzle":"2x2"
                    }
                }
            }
        ],
        "solves":[  
            {  
                "createdAt":"2019-03-07 01:03:52",
                "id":5,
                "scrambleId":16,
                "time":11837,
                "scramble":{  
                    "id":16,
                    "puzzle":"2x2"
                }
            }
        ],
        "totals":[  
            {  
                "puzzle":"2x2",
                "total":1
            }
        ],
        "user":{  
            "avatar":null,
            "createdAt":"2019-03-02 18:54:40",
            "name":null,
            "username":"scott"
        }
    }
}