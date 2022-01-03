import React, { createContext, useReducer } from 'react';
import {PlanningReducer} from './PlanningReducer';

import Search from "../../layouts/Search";


const initialPlanings = {
    plannings:[ ]
};

export const PlanningContext = React.createContext(initialPlanings)


const PlanningProvider = ({ children }) => {


    const [planningState, dispatch] = useReducer(PlanningReducer, initialPlanings)

    const addPlanning = (planning) => {
        dispatch({
          type: 'ADD_PLANNING',
          payload: planning
        })
      }
      const editPlanning = (planning) => {
        dispatch({
          type: 'EDIT_PLANNING',
          payload: planning
        })
      }
      const deletePlanning = (planning) => {
        dispatch({
          type: 'DELETE_PLANNING',
          payload: planning
        })
      }

      
    return (
        <PlanningContext.Provider value={{plannings: planningState.plannings, addPlanning, editPlanning, deletePlanning}}>

            {children}
        </PlanningContext.Provider>
    )} 

export default PlanningProvider;
