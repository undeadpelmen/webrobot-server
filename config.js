import pino from "pino";

const config = {
    port: 3000,
}

const transport = pino.transport({
    targets: [
        {
            target: "pino/file",
            level: "error",
            options: {
                destination: "./log/error.log",
                mkdir: true
            },
        },
        {
            target: "pino/file",
            level: "info",
            options: {
                destination: "./log/info.log",
                mkdir: true
            },
        },
        {
            target: "pino-pretty",
            level: "trace",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
            }
        },
    ],
});

export const logger = pino(transport);

export default config;