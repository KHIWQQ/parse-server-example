import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard'; // Correctly import ParseDashboard
import path from 'path';
const __dirname = path.resolve();
import http from 'http';

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb+srv://admin:admin@whiteforces.e7jrl.mongodb.net/',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'WF_Tracker',
  masterKey: process.env.MASTER_KEY || '1337', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};

// Dashboard configuration
const dashboardConfig = {
  apps: [
    {
      serverURL: config.serverURL,
      appId: config.appId,
      masterKey: config.masterKey,
      appName: 'WF Tracker', // App name displayed on the dashboard
    },
  ],
  users: [
    {
      user: process.env.DASHBOARD_USER || 'admin', // Default username
      pass: process.env.DASHBOARD_PASS || 'admin', // Default password
    },
  ],
  useEncryptedPasswords: false, // For demonstration purposes, avoid in production
};

export const app = express();

// Mount the Parse Dashboard
const dashboard = new ParseDashboard(dashboardConfig, { allowInsecureHTTP: true });
app.use('/dashboard', dashboard);

app.set('trust proxy', true);

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  await server.start();
  app.use(mountPath, server.app);
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// Test page route
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

if (!process.env.TESTING) {
  const port = process.env.PORT || 1337;
  const httpServer = http.createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  await ParseServer.createLiveQueryServer(httpServer);
}
