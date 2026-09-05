import { Request, Response } from "express";

import { MedicosService } from "./services/medicos.services";

import {medicoQuerySchema } from "../../schemas/medico.query.schema";

import { medicoSchema } from "../../schemas/medico.schema";


export class MedicosController {
    repository: any;

    constructor(
        private service: MedicosService
    ) {}


 obtenerTodos = async (
    req: Request,
    res: Response
): Promise<Response> => {

    const resultado =
        medicoQuerySchema.safeParse(req.query);

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

        const medicos =
            await this.service.obtenerTodos(
                resultado.data
            );

        return res.status(200).json(medicos);

    } catch (error) {

        console.error(
            "ERROR REAL AL OBTENER MÉDICOS:",
            error
        );

        return res.status(500).json({
            error: "Error al obtener médicos"
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

        const medico =
            await this.service.obtenerPorId(id);

        console.log("Médico encontrado:", medico);

        if (!medico) {
            return res.status(404).json({
                error: "Médico no encontrado"
            });
        }

        return res.status(200).json(medico);

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
            medicoSchema.safeParse(req.body);

        if (!resultado.success) {

            return res.status(400).json({
                error: "Datos inválidos",
                detalles: resultado.error.issues
            });
        }

        try {

            const medico =
                await this.service.crear(
                    resultado.data
                );

            return res.status(201).json(medico);

        } catch (error) {

            console.error(
                "Error al crear médico:",
                error
            );

            return res.status(500).json({
                error: "Error al crear médico"
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
            medicoSchema.safeParse(req.body);

        if (!resultado.success) {

            return res.status(400).json({
                error: "Datos inválidos",
                detalles: resultado.error.issues
            });
        }

        const medico =
            await this.service.actualizar(
                id,
                resultado.data
            );

        if (!medico) {

            return res.status(404).json({
                error: "Médico no encontrado"
            });
        }

        return res.status(200).json(medico);

    } catch (error) {

        console.error(
            "ERROR AL ACTUALIZAR MÉDICO:",
            error
        );

        return res.status(500).json({
            error: "Error al actualizar médico"
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
                error: "Médico no encontrado"
            });
        }

        return res.status(204).send();

    } catch (error) {

        console.error(
            "ERROR AL ELIMINAR MÉDICO:",
            error
        );

        return res.status(500).json({
            error: "Error al eliminar médico"
        });
    }
};}
