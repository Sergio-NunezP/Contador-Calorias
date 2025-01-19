import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducers"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState = {
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        // Convertir a números antes de setear el State
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        //Setear el state
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    // Deshabilitar el boton de "Guardar Comida o Ejercicio" mientras los campos estén vacios
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity(initialState)

    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select name="" id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="EJ: Comida: Carne, Arroz, Jugo - Ejericio: Trotar, Taltar la cuerda, Gym"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="EJ: 300, 500, 700"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
                // Validacion de boton "Guardar"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}
