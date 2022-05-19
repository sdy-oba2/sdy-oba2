const { scanComponent } = require('./src/handleMd');

require('dotenv').config();
require('@babel/register')();
require("./src");

scanComponent();
