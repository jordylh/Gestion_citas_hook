import { useEffect, useState } from "react";
import { citas_db } from "../data/citas_db.js";

export default function useCitas() {
    const [listaDeCitas, setListaDeCitas] = useState(()=>{
        const savedCitas = localStorage.getItem('listaDeCitas')
        return savedCitas ? JSON.parse(savedCitas) : citas_db
    });
    const [seleccionarCita, setSeleccionarCita] = useState('');

    const selectCita = (id) => {
        const citaSelect = listaDeCitas.find(cita => cita.id === id);
        setSeleccionarCita(citaSelect);
    }

    const actualizarCitas = (id, available) => {
        const updatedCitas = listaDeCitas.map(cita =>
            cita.id === id ? { ...cita, available } : cita
        )
        setListaDeCitas(updatedCitas); // Fixed the curly braces here
    }

    const reservarCita = (id) => { // Added `id` as a parameter
        actualizarCitas(id, false);
    }

    const cancelarCita = (id) => {
        actualizarCitas(id, true);
    }

    const resetForm=()=>{
        setListaDeCitas(citas_db)
        setSeleccionarCita('')
    }

    useEffect(()=>{
        localStorage.setItem('listaDeCitas',JSON.stringify(listaDeCitas))
    },[listaDeCitas])

    return [
        listaDeCitas,
        seleccionarCita,
        selectCita,
        reservarCita,
        cancelarCita,
        resetForm
    ];
}
