"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("dotenv/config");
require("reflect-metadata");
var dayjsdateprovider_1 = require("./implementatios/dayjsdateprovider");
tsyringe_1.container.registerSingleton("Dayjsdateprovider", dayjsdateprovider_1.Dayjsdateprovider);
