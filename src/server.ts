import "dotenv/config";

import express from "express";

import turnosRouter from "./routes/turnos.routes";

import medicosRoutes
    from "./routes/medicos.routes";

import authRoutes
    from "./routes/auth.routes";

    
const app = express();

app.use(express.json());


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/medicos",
    medicosRoutes
);


app.use(
    "/api/turnos",
    turnosRouter
);


app.listen(
    3000,
    () => {

        console.log(
            "Servidor HTTP ejecutándose en http://localhost:3000"
        );

    }
);