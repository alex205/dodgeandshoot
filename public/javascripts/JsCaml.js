var JsCaml = function (url) {
  this.socket = io.connect(url);
};

JsCaml.prototype.export_canvas = function () {
  this.socket.emit('canvas', monCanvas.toDataURL('image/png'));
};
