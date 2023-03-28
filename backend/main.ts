import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5555;

class Computer {
    id: number;
    energyValues: [{ value: number, timestemp: number }];

    constructor(id: number) {
        this.id = id;
        this.energyValues = [] as any;
    }
}

const computers: Map<number, Computer> = new Map<number, Computer>();

for (let i = 0; i < 10; i++) {
    computers.set(i, new Computer(i));
}

setInterval(() => {
    const time = Date.now();
    for (const computer of computers.values()) {
        computer.energyValues.push({ value: Math.floor(Math.random() * 101), timestemp: time });
    }
}, 1000)

app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '../../frontend/pc-energy-dashboard/build/index.html'));
    }
});

app.get('/computer/:id', (req, res) => {
    console.log(req.params.id);
    if (!/[0-9]/.test(req.params.id)) {
        res.send(computers.get(parseInt(req.params.id)));
    }
})

app.use(express.static(path.join(__dirname, '../frontend/pc-energy-dashboard/build')));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});