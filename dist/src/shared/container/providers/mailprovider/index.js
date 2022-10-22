"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var ethereaimailprovider_1 = require("../mailprovider/implementations/ethereaimailprovider");
var SESmailprovider_1 = require("./implementations/SESmailprovider");
var mailprovider = {
    ethereal: tsyringe_1.container.resolve(ethereaimailprovider_1.Ethereaimailprovider),
    SES: tsyringe_1.container.resolve(SESmailprovider_1.SESmailprovider)
};
tsyringe_1.container.registerInstance("Mailprovider", mailprovider[process.env.mailprovider]);
