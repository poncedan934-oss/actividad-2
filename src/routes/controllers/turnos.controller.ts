import { Request, Response } from "express";

import { TurnosService } from "./services/turnos.services";

import { turnoQuerySchema } from "../../schemas/turno.query.schema";

import { turnoSchema } from "../../schemas/turno.schema";



export class TurnosController {

    constructor(
        private service: TurnosService
    ) {}

    obtenerTodos = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        console.log("QUERY RECIBIDA:", req.query);

        const resultado =
            turnoQuerySchema.safeParse(req.query);

        if (!resultado.success) {
            console.error(
                "Error de validación:",
                resultado.error.issues
            );

            return res.status(400).json({
                error: "Query parameters inválidos",
                detalles: resultado.error.issues
            });
        }

        try {
            const turnos =
                await this.service.obtenerTodos(resultado.data);

            console.log("TURNOS EN CONTROLLER:", turnos);

            return res.status(200).json(turnos);
        } catch (error) {
            console.error("Error al obtener turnos:", error);

            return res.status(500).json({
                error: "Error al obtener turnos"
            });
        }
    };

    obtenerPorId = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const id = Number(req.params.id);

            console.log("ID recibido:", req.params.id);
            console.log("ID convertido:", id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    error: "El ID debe ser numérico"
                });
            }

            const turno =
                await this.service.obtenerPorId(id);

            console.log("Turno encontrado:", turno);

            if (turno === null || turno === undefined) {
                return res.status(404).json({
                    error: "Turno no encontrado"
                });
            }

            return res.status(200).json(turno);
        } catch (error) {
            console.error("ERROR REAL:", error);

            return res.status(500).json({
                error: "Error interno en el servidor"
            });
        }
    };

    crear = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const resultado =
            turnoSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: resultado.error.issues
            });
        }

        try {
            const turno =
                await this.service.crear(
                    resultado.data
                );

            return res.status(201).json(turno);
        } catch (error) {
            console.error(
                "Error al crear turno:",
                error
            );

            return res.status(500).json({
                error: "Error al crear turno"
            });
        }
    };

    actualizar = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "El ID debe ser numérico"
            });
        }

        const resultado =
            turnoSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: resultado.error.issues
            });
        }

        const turno =
            await this.service.actualizar(
                id,
                resultado.data
            );

        if (!turno) {
            return res.status(404).json({
                error: "Turno no encontrado"
            });
        }

        return res.status(200).json(turno);

    } catch (error) {

        console.error(
            "ERROR AL ACTUALIZAR TURNO:",
            error
        );

        return res.status(500).json({
            error: "Error al actualizar turno"
        });
    }
};

eliminar = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "El ID debe ser numérico"
            });
        }

        const eliminado =
            await this.service.eliminar(id);

        if (!eliminado) {
            return res.status(404).json({
                error: "Turno no encontrado"
            });
        }

        return res.status(204).send();

    } catch (error) {

        console.error(
            "ERROR AL ELIMINAR TURNO:",
            error
        );

        return res.status(500).json({
            error: "Error al eliminar turno"
        });
    }
};
}