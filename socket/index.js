const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let bankUsers = []

io.on("connection", (socket) => {

    console.log("New Connection", socket.id);


    socket.on("addNewUser", (userId) => {
        !bankUsers.some((user => user.userId === userId)) &&

        bankUsers.push({
            userId,
            socketId: socket.id
        });

        console.log("bankUsers", bankUsers);

        io.emit("getAllBankMembers", bankUsers);
    });

  
    socket.on("disconnect", () => {
        bankUsers = bankUsers.filter(user => user.socketId !== socket.id);

        io.emit("getAllBankMembers", bankUsers);
    })

});

io.listen(3000);

