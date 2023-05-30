// data.js
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        userName: "johndoe",
        password: "JohnDoe@123"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        userName: "janesmith",
        password: "JaneSmith@123"
    },
];

const tokens = [];  // [{userId: number, refreshToken: string, expirationTime: number }]

module.exports = { users, tokens };