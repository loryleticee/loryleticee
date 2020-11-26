var forever = require('forever');

var child = new forever.Forever('app.js', {
  max: 3,
  silent: true,
  args: []
});

child.on('exit', this.callback);
child.start();