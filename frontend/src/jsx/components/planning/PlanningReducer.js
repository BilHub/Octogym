export const PlanningReducer = (planningState, action) => {
    switch(action.type){

        case "ADD_PLANNING":
            const addedPlanning = [...planningState.plannings, action.payload]
            console.log('sans dots ', action.payload);
            console.log('avec dots ....', ...action.payload);
            return {...planningState, plannings:addedPlanning}
        case "EDIT_PLANNING":
            const updatePlanning = {...action.payload};
            const updatePlanningId = planningState.plannings.findIndex(p => p.id === action.payload.id)
            // const updatePlannings = planningState.plannings.map(planning => {
            //     if (planning.id === updatePlanning.id) {
            //         return updatePlanning
            //     }
            //     return planning ;
            // })
            const updatedPlannings = [
                ...planningState.plannings.slice(0,updatePlanningId),
                updatePlanning,
                ...planningState.plannings.slice(updatePlanningId + 1)
              ];
            return { ...planningState, plannings: updatedPlannings}
        default :
            return planningState
    }
}