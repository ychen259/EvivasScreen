'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb+srv://admin-nova:Aa947496@cluster0.hfjg9le.mongodb.net/?retryWrites=true&w=majority',
    //'mongodb+srv://novascreen:Aa947496@cluster0.cuiun1m.mongodb.net/?retryWrites=true&w=majority',
    // 'mongodb+srv://admin-nova:novascreen@cluster0.eqvri.mongodb.net/novascreen?retryWrites=true&w=majority',
    /*'mongodb://ychen259:Aa947496@cluster0-shard-00-00.wccdn.mongodb.net:27017,cluster0-shard-00-01.wccdn.mongodb.net:27017,cluster0-shard-00-02.wccdn.mongodb.net:27017/sasasas?ssl=true&replicaSet=atlas-iulcjf-shard-0&authSource=admin&retryWrites=true&w=majority',*/
    //mongodb+srv://ychen259:<password>@cluster0.wccdn.mongodb.net/test
    //
    options: {},
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },

  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    username: '@TWITTER_USERNAME',
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID'|| 'AY1MyhC3J0flDf_jJIDmxFWdtLQhPf1ekMRVNMKstOBM9WFPGhIdsciDkOrIGeYz9Di9eeMqO30KbJ_4',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET' || "EEdeCmewXtXmpKv9CptNa_YHXw35G3ODUsZCe44o_Y76_qrQtkVi6x0UQW13Nh6VtGE4sKEFJzX9MuZW",
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    /*
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }*/
    from: process.env.MAILER_FROM || 'MAILER_FROM' || 'evivasscreenwebsite@gmail.com',
    to: "rockybikellc@gmail.com",
    options: {
      service: 'Gmail',
      secure: false,
      port:465,
      auth: {
        user: 'evivasscreenwebsite@gmail.com',
        pass: 'wnssubrzjviqofeh'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true',
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false'
    },
    // Order of collections in configuration will determine order of seeding.
    // i.e. given these settings, the User seeds will be complete before
    // Article seed is performed.
    /*collections: [{
      model: 'User',
      docs: [{
        data: {
          username: 'local-admin',
          email: 'admin@localhost.com',
          firstName: 'Admin',
          lastName: 'Local',
          roles: ['admin', 'user']
        }
      }, {
        // Set to true to overwrite this document
        // when it already exists in the collection.
        // If set to false, or missing, the seed operation
        // will skip this document to avoid overwriting it.
        overwrite: true,
        data: {
          username: 'local-user',
          email: 'user@localhost.com',
          firstName: 'User',
          lastName: 'Local',
          roles: ['user']
        }
      }]
    }, {
      model: 'Article',
      options: {
        // Override log results setting at the
        // collection level.
        logResults: true
      },
      skip: {
        // Skip collection when this query returns results.
        // e.g. {}: Only seeds collection when it is empty.
        when: {} // Mongoose qualified query
      },
      docs: [{
        data: {
          title: 'First Article',
          content: 'This is a seeded Article for the development environment'
        }
      }]
    }]*/
  }
};
