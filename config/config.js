var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'embed-decipher'
    },
    port: 3000,
    db: 'mysql://root@localhost/embed-decipher-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'embed-decipher'
    },
    port: 3000,
    db: 'mysql://root@localhost/embed-decipher-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'embed-decipher'
    },
    port: 3000,
    db: 'mysql://root@localhost/embed-decipher-production'
  }
};

module.exports = config[env];
