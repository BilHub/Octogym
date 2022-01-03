import React, { useState , useEffect, useContext} from "react";
import {  useHistory } from "react-router-dom";

import axios from 'axios';
import { useGetAPI,  usePutAPI } from '../useAPI'
// import PlanningProvider from './PlanningState'
import { set } from "date-fns";

function refreshPage() {
  window.location.reload(false);
}

const PlanningEdit = (props) => {

    const [name , setName] = useState("");
    const [salle_sport , setSalle_sport] = useState("");
    const currentPlanningId = props.match.params.id;
    
    let planningURI = `${process.env.REACT_APP_API_URL}/rest-api/planning/${currentPlanningId}/`

    const history = useHistory();
    useEffect(() => {
      axios.get(planningURI).then((res) => {
        setName(res.data.name)
        setSalle_sport(res.data.salle_sport)
    })
    }, []);
    let salleEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-sport/`
     const salles = useGetAPI(salleEnd)

    const HandleSubmit =  e => {
      e.preventDefault();
      const newPlanning = {
        name:name, 
        salle_sport: Number(salle_sport)//convert and pass the id as number 
      }
        usePutAPI(planningURI, newPlanning)
        history.push("/planning")
        refreshPage()
      }
    return (
        <div>
          <h1>Modifier le planning de {name} </h1>
          <form onSubmit={HandleSubmit}>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label>name</label>
              <input type="text" id="salle_name" value={name} name="name"  className="form-control" autoComplete="name" onChange={e => setName(e.target.value)} />
            </div>
              <div className="form-group col-md-6">
                <label for="cars">Selectionner une salle:</label>
                <select name="salle_sport"  className="form-control" id="cars" value={salle_sport} onChange={e => setSalle_sport(e.target.value)}>
                  <option value="option" >Cliquez pour choisir</option>
                    { salles.map(salle =>
                        <option value={salle.id}>{salle.name}</option>
                    )}
                </select>
              </div>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">
              Modifier
            </button>
          </form>
        </div>
    )
}
export default PlanningEdit;