// date: 5/04/2019
// endpoint: /api/speedcube/speedcube/config
// method: get
export function getConfigFixture() {
    return {
        status: 'success',
        configs: [
            {
                id: 1,
                userId: 1,
                puzzle: '3x3',
                config: '{"colors":["#FFEC49","#FF9E32","#2865E6","#EC6157","#58EA5E","#F0F0F0"],"stickerSpacing":17,"stickerElevation":11,"stickerRadius":17,"innerBrightness":77,"cameraAngle":54,"cameraDistance":2183,"turnDuration":78}',
                createdAt: '2019-03-14 04:02:58',
                updatedAt: '2019-04-30 17:09:45',
            },
            {
                id: 4,
                userId: 1,
                puzzle: '2x2',
                config: '{"colors":["#FFEE5D","#EFAA18","#2557E2","#EC6157","#5CBD60","#F0F0F0"],"stickerSpacing":28,"stickerElevation":10,"stickerRadius":0,"innerBrightness":79,"cameraAngle":52,"cameraDistance":2000,"turnDuration":75}',
                createdAt: '2019-03-14 16:16:44',
                updatedAt: '2019-05-04 05:56:44',
            },
            {
                id: 10,
                userId: 1,
                puzzle: '4x4',
                config: '{"colors":["#FFE400","#EFAA18","#4375FF","#EC6157","#5CBD60","#F0F0F0"],"stickerSpacing":23,"stickerElevation":18,"stickerRadius":0,"innerBrightness":92,"cameraAngle":52,"cameraDistance":2591,"turnDuration":82}',
                createdAt: '2019-05-04 05:04:09',
                updatedAt: '2019-05-04 14:45:29',
            },
        ],
    };
}
