import React, { useReducer} from "react";

import AddSalle from './SalleCreate'


const initialSalleState = {
    salles:[
        { 
            name: "salles vouabelm 222",
            adresse: "centre zbaana blida", 
            phone:" 0533961612"
        },
    ]
};

// const initialSalleState = 
//     { 
//         name:  { 
//             label: "Nom de la salle",
//             value: ""
//         },
//         adresse:  { 
//             label: "Adresse de la salle",
//             value: ""
//         },
//         phone:  { 
//             label: "Numéro de la salle",
//             value: ""
//         },
       
//     };


export const SalleContext = React.createContext()



function Salle() {
    const [state, dispatch] = useReducer(salleReducer,initialSalleState)
    return(
        <SalleContext.Provider value={{state,dispatch}} >
            <AddSalle/>
        </SalleContext.Provider>
    )}

function salleReducer(state, action){
    switch(action.type){
        case  "delete":
            const generatedSallesAfterDelete = state.salles.filter( salle => salle.id !== action.payload.id)
            return {...state, salles: generatedSallesAfterDelete}
        case "create":
            try {
                const createSalleName = {
                            name:action.payload[0],
                            adresse:action.payload[1],
                            phone:action.payload[2],
                        }
                    
                // const createSalleName = {...action.payload}
                state.salles.push(createSalleName)
                console.log('the new STATEEEE', {...action.payload}); 
                
                const old_state = state.salles.push(createSalleName)
                console.log('BEFORE THE ADDED SALLE ', old_state); 
                const addedSalles = state.salles
                console.log('AFTER THE ADDED SALLE ', addedSalles); 

                const newState = {createSalleName, salles:addedSalles }

                return newState
            } catch (error) {
                console.log(error);
            }
            // const createSalleAdressee = {adresse:action.payload}
            // const createSallePhone = {phone:action.payload}
            //
            //
            //
            //samarche mais recupere tous les champs dans une seule ligne nous voulons que chaque input a sa propre ligne
            //samarche mais recupere tous les champs dans une seule ligne nous voulons que chaque input a sa propre ligne
            // le probleme est dans salleCreate.js payload:[salleName,salleAdresse, sallePhone]
            // OU
            // le probleme est dans salleCreate.js dans salleReducer case create qui
            //
            //
            //
            // const createSalle = {...action.payload}
        default: 
            return initialSalleState
    }    
}

export default Salle ;