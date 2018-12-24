(() => {
"use strict";

if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

const octokit = require('@octokit/rest')()
const app = require("express")();
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();


const error = (status, message) => {
  throw (() => {
    return {
      status: status,
      message: message
    };
  })();
};

const defaults = {
  commit_message: "commited by app",
  product: {
    path: "docs/_products/",
    extension: ".md"
  }
};

const app_functions = {
  "util": {
    "id": (length = 20) =>
      Array(length)
        .fill()
        .map((chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') =>
          chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('')
  },
  "create": {
    "product": () =>

  },
  "read": {
    "product": (productId) =>
      octokit.repos.updateFile({owner, repo, path, message, content, sha})
  },
  "update": {
    "product": (owner, repo, productId, message, content, sha) =>
      octokit.repos.updateFile({
        owner: owner,
        repo: repo,
        path: `${defaults.product.path}${productId}${defaults.product.extension}`,
        message: message,
        content: content,
        sha: sha
      })
  },
  "delete": {}
};

// cors stuff
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://yggilabs.github.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("AMP-Access-Control-Allow-Source-Origin", req.query.__amp_source_origin);
  res.header("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin");
  res.header("Vary", "Origin");
  next();
});

// validate user and insert ids
app.use((req, res, next) => {
  // authenitcate here and add user field to req with appropriate id
  next();
});


const { check, validationResult } = require('express-validator/check');

app.post('/product/', (req, res) =>
  app_functions.create.(req.body)
    .then(doc =>
      res.send("")));

exports.api = functions.https.onRequest(app);

})();
