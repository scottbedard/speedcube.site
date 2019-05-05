export function postSigninFixture() {
    return {
        id: 1,
        name: 'Scott',
        email: 'foo@bar.com',
        permissions: null,
        is_activated: true,
        activated_at: '2019-03-02 18:56:40',
        last_login: '2019-05-04 17:05:30',
        created_at: '2019-01-01 18:56:40',
        updated_at: '2019-05-04 17:05:30',
        username: 'scott',
        surname: '',
        deleted_at: null,
        last_seen: '2019-05-04 17:05:17',
        is_guest: 0,
        is_superuser: 0,
        avatar: null,
        configs: [],
        keyboard_configs: [],
        profile: {
            id: 1,
            user_id: 1,
            twitter_broadcasting: false,
            twitter_handle: '',
            created_at: '2019-03-14 03:43:26',
            updated_at: '2019-04-04 22:13:42'
        }
    }
}

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