import { Medico } from "./models/medico";
import { MedicosRepository } from "../../../repositories/medicos.repository";
import { MedicoInput } from "../../../schemas/medico.schema";
import { MedicoQuery } from "../../../schemas/medico.query.schema";

export class MedicosService {
    constructor(private repository: MedicosRepository) {
        console.log("Repository recibido:", repository);
    }

    async crear(
    datos: MedicoInput
): Promise<Medico> {

    const medicos =
        await this.repository.obtenerTodos();

    const nuevoId =
        medicos.length > 0
            ? Math.max(
                ...medicos.map(
                    medico => medico.id
                )
            ) + 1
            : 1;

    const nuevoMedico: Medico = {
        id: nuevoId,
        ...datos
    };

    return await this.repository.crear(
        nuevoMedico
    );
}
    

    async obtenerTodos(filtros: MedicoQuery = {}): Promise<Medico[]> {
        console.log("FILTROS RECIBIDOS:", filtros);

        const medicos = await this.repository.obtenerTodos();

        console.log("MÉDICOS LEÍDOS:", medicos);

        return medicos.filter((medico: any) => {
            console.log("PROCESANDO MÉDICO:", medico);
            return true;
        });
    }

    async obtenerPorId(id: number): Promise<Medico | undefined> {
        return await this.repository.obtenerPorId(id);
    }
    

    async actualizar(
        id: number,
        datos: MedicoInput
    ): Promise<Medico | undefined> {
        const medico = await this.repository.obtenerPorId(id);

        if (!medico) {
            return undefined;
        }

        const medicoActualizado: Medico = {
            id,
            ...datos
        };

        return await this.repository.actualizar(medicoActualizado);
    }

    async eliminar(id: number): Promise<boolean> {
        const medico = await this.repository.obtenerPorId(id);

        if (!medico) {
            return false;
        }

        await this.repository.eliminar(id);

        return true;
    }
}
