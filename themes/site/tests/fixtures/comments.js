/* eslint-disable */

// date: 6-22-2019
// endpoint: /api/speedcube/speedcube/comments/solve/1
// method: get
export function commentsFixture() {
    return {  
        status:"success",
        comments:[  
            {  
                id:6,
                commentableId:1,
                commentableType:"Speedcube\Speedcube\Models\Solve",
                userId:2,
                body:"<b>this shouldn't work</b>",
                createdAt:"2019-06-22 22:13:29",
                updatedAt:"2019-06-22 22:13:29",
                user:{  
                    id:2,
                    name:null,
                    username:"scott"
                }
            },
            {  
                id:5,
                commentableId:1,
                commentableType:"Speedcube\Speedcube\Models\Solve",
                userId:2,
                body:"That's what makes life fun. That you can make these decisions. That you can create the world that you want. I thought today we would do a happy little picture. This is a happy place, little squirrels live here and play. How to paint. That's easy. What to paint. That's much harder. Clouds are free they come and go as they please. Maybe there's a little something happening right here.",
                createdAt:"2019-06-22 22:07:03",
                updatedAt:"2019-06-22 22:07:03",
                user:{  
                    id:2,
                    name:null,
                    username:"scott"
                }
            },
            {  
                id:4,
                commentableId:1,
                commentableType:"Speedcube\Speedcube\Models\Solve",
                userId:2,
                body:"asdffffff",
                createdAt:"2019-06-22 21:56:35",
                updatedAt:"2019-06-22 21:56:35",
                user:{  
                    id:2,
                    name:null,
                    username:"scott"
                }
            },
            {  
                id:3,
                commentableId:1,
                commentableType:"Speedcube\Speedcube\Models\Solve",
                userId:2,
                body:"asdf",
                createdAt:"2019-06-22 21:56:32",
                updatedAt:"2019-06-22 21:56:32",
                user:{  
                    id:2,
                    name:null,
                    username:"scott"
                }
            }
        ],
        pagination:{  
            currentPage:1,
            lastPage:1,
            results:4
        }
    }
}

// date: 6-22-2019
// endpoint: /api/speedcube/speedcube/comments/solve/1
// method: get
export function emptyCommentsFixture() {
    return {
        status: 'success',
        comments: [],
        pagination: {
            currentPage: 1,
            lastPage: 1,
            results: 0,
        },
    };
}

