import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: "*", // Allow all origins (adjust for security)
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    console.log("New client connected: ".concat(socket.id));
    socket.on("orderPaid", function (data) {
        console.log("Order Paid Received on Server:", data); // Log the received data
        io.emit("orderPaid", data); // Broadcast to all clients
    });
    socket.on("disconnect", function () {
        console.log("Client disconnected: ".concat(socket.id));
    });
});
const PORT = process.env.PORT || 3000
io.listen(PORT); // Start WebSocket server on port 4000
console.log("WebSocket server running on port " + PORT);
