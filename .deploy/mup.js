module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '139.180.223.67',
      username: 'root',
      // pem: './path/to/pem'
      password: '8.eEb?4UCE[q]NE.'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'hotpic',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://139.180.223.67',
      MONGO_URL: "mongodb://mongodb:27017/meteor",
      // MONGO_URL: 'mongodb://localhost:27017/meteor',
      // MONGO_URL: 'mongodb+srv://picuser:minhkha@cluster0.mxest.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
