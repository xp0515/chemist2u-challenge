import { createServer } from "http";
import { Server } from "socket.io";
import { ServerEvent, Timer, TimerPayload } from "./src/app/shared/models";

const express = require('express')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const timers = new Map();

io.on("connection", (socket) => {
    if (timers.size > 0) {
        for (const [id, duration] of timers) {
            if (typeof duration === 'number') {
                io.emit(ServerEvent.SERVEREVENT, { id, duration });
            }
        }
    }

    socket.on(ServerEvent.ADDTIMER, (data: TimerPayload) => {
        timers.set(data.id, data.duration)
    })

    socket.on(ServerEvent.STARTTIMER, (data: TimerPayload) => {
        let duration = data.duration - 1
        timers.set(data.id, setInterval(() => {
            io.emit(ServerEvent.SERVEREVENT, { id: data.id, duration });
            duration--;
        }, 1000))
    });

    socket.on(ServerEvent.STOPTIMER, (data: TimerPayload) => {
        clearInterval(timers.get(data.id))
        timers.set(data.id, data.duration)
        io.emit(ServerEvent.SERVEREVENT, { id: data.id, duration: data.duration });
    });

    socket.on(ServerEvent.REMOVETIMER, (data: TimerPayload) => {
        clearInterval(timers.get(data.id));
        timers.delete(data.id);
    })
});

httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});