"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5555;
class Computer {
    constructor(id) {
        this.id = id;
        this.energyValues = [];
    }
}
const computers = new Map();
for (let i = 0; i < 10; i++) {
    computers.set(i, new Computer(i));
}
setInterval(() => {
    const time = Date.now();
    for (const computer of computers.values()) {
        computer.energyValues.push({ value: Math.floor(Math.random() * 101), timestemp: time });
    }
}, 1000);
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    }
    else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path_1.default.join(__dirname, '../../frontend/pc-energy-dashboard/build/index.html'));
    }
});
app.get('/computer/:id', (req, res) => {
    console.log(req.params.id);
    if (!/[0-9]/.test(req.params.id)) {
        res.send(computers.get(parseInt(req.params.id)));
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/pc-energy-dashboard/build')));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
