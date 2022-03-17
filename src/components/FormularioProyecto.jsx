import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setfechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const params = useParams();

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {
        if (params.id && proyecto.nombre) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setfechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

        setId(null);
        setNombre('');
        setDescripcion('');
        setfechaEntrega('');
        setCliente('');
    }

    const { msg } = alerta;

    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >
                    Nombre Proyecto
                </label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-b-md"
                    placeholder="Nombre del proyecto"
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >
                    Descripcion
                </label>
                <textarea
                    id="descripcion"
                    type="text"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-b-md"
                    placeholder="Descripcion del proyecto"
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-entrega"
                >
                    Fecha Entrega
                </label>
                <input
                    id="fecha-entrega"
                    type="date"
                    value={fechaEntrega}
                    onChange={e => setfechaEntrega(e.target.value)}
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-b-md"
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente"
                >
                    Cliente
                </label>
                <input
                    id="cliente"
                    type="text"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-b-md"
                    placeholder="Cliente"
                />
            </div>

            <input
                type="submit"
                value={id ? 'Actualizar Proyecto': 'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto