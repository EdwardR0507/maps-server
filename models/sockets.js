const Markers = require("./markers");

class Sockets {
  constructor(io) {
    this.io = io;
    this.markers = new Markers();
    this.socketEvents();
  }
  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Socket connected", socket.id);
      socket.emit("active-markers", this.markers.actives);
      socket.on("new-marker", (marker) => {
        this.markers.addMarker(marker);
        socket.broadcast.emit("new-marker", marker);
      });
    });
  }
}
module.exports = Sockets;
