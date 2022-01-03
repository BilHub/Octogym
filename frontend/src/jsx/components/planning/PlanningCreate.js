import React, { useState } from "react";

import { useGetAPI, usePostAPI } from '../useAPI'
// import PlanningProvider from './PlanningState'
import {  useHistory } from "react-router-dom";

function refreshPage() {
  window.location.reload(false);
}

const PlaningCreate = () => {
//declare all atributes state
    const [planningName, setPlanningName] = useState("");
    const [planningSalleSport, setPlanningSalleSport] = useState("");

    let salleEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-sport/`

    const salles = useGetAPI(salleEnd)
    const history = useHistory();

    const HandleSubmit =  e => {
      e.preventDefault();
      let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/planning/create`
      //create new planing
      const newPlanning = {
        name:planningName, 
        salle_sport: Number(planningSalleSport)//convert and pass the id as number 
      }
        usePostAPI(endpoint, newPlanning)
      //  setPlanningName("")
      //  setPlanningSalleSport("")
       history.push("/planning")
       refreshPage()
      }
    return (
              <div>

                <h1>Ajouter un planning </h1>
                <div className="card">
                  <div className="card-body">
                    <div className="basic-form">
                      <form onSubmit={HandleSubmit}>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>Nom du Planning</label>
                            <input type="text" id="salle_name" className="form-control" value={planningName} name="name" onChange={e => setPlanningName(e.target.value)} />
                          </div>
                          <div className="form-group col-md-6">
                            <label>Salle de Sport</label>
                            <select defaultValue={"option"} className="form-control" name="salles" id="cars" value={planningSalleSport} onChange={e => setPlanningSalleSport(e.target.value)}>
                              <option value="option" >Cliquez pour choisir</option>
                                  { salles.map(salle => <option value={salle.id}>{salle.name}</option>)}
                            </select>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Creer
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                </div>
        
    )
}
export default PlaningCreate;