import {Server} from "socket.io"
import http from "http"

// Create an HTTP server
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running');
});

// Initialize socket.io server with the HTTP server
const io = new Server(app);

// Handle WebSocket connections
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

// Use the PORT environment variable provided by Railway (or fallback to 4000 locally)
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';  // Railway expects this

// Start the server listening on HOST and PORT
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
