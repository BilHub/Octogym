import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useGetAPI, usePutAPI } from '../useAPI'
import {  useHistory } from "react-router-dom";

 
function refreshPage() {
  window.location.reload(false);
}
const EditClient = (props) => {
  let creneauxEnd = `${process.env.REACT_APP_API_URL}/rest-api/creneau/`
  const currentPresenceId = props.match.params.id;

  let presenceURI = `${process.env.REACT_APP_API_URL}/rest-api/presence/${currentPresenceId}/`
  let presenceEditURI = `${process.env.REACT_APP_API_URL}/rest-api/presence/edit/${currentPresenceId}/`
  const creneaux = useGetAPI(creneauxEnd)
  const history = useHistory();
  const [presenceDate, setPresencedate] = useState("")
  const [presenceClient, setPresenceClient] = useState("")
  const [client, setClient] = useState("")

  const [similarCreneaux, setSimilarCreneaux] = useState([]);
 
  const [hour_entree, setHour_entree] = useState("");
  const [hour_sortie ,setHour_sortie] = useState("");
  const [activity, setActivity] = useState("");
  
  const [creneau, setCreneau] = useState("");
  
 
  //FK 
  useEffect(() => {
    axios.get(presenceURI).then((res) => {
    
      setHour_entree(res.data.hour_entree)
      setHour_sortie(res.data.hour_sortie)
      setActivity(res.data.client_activity)
      setSimilarCreneaux(res.data.similar_creneaux)
      setPresenceClient(res.data.client_last_name)
      setClient(res.data.client)
      setPresencedate(res.data.date)
      console.log('the Presence instance is ======>', res.data);
  })
  }, []);


const setNewPresence = () => {
  if (creneau  === '') {
    const newClient = {
      hour_entree:hour_entree,
      hour_sortie:hour_sortie,
    }
    return newClient
  }else {
    const newClient = {
      hour_entree:hour_entree,
      hour_sortie:hour_sortie,
      creneau : Number(creneau)

    }
    return newClient
  }
}
  const HandleSubmit = async e => {
      e.preventDefault();
      const newClient = setNewPresence()
      usePutAPI(presenceEditURI, newClient)
      history.push("/presences")
      // refreshPage()
  }
  const getSelected = (activity, creneau )=> {
    return activity === creneau.activity
  }
  return (
        <div className="">
          <div className="card">
            <div className="card-header d-block">
              <h4 className="card-title">Presence date : <span className="text-success">{presenceDate}</span> </h4> 
              <h4>abonnée : <span className="text-success">{presenceClient}</span>  </h4>
              <h4>id : <span className="text-success">{client}</span> </h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={HandleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Heure d'entrée </label>
                      <input type="time" name="last_name" className="form-control"value={hour_entree} placeholder="Nom du client" onChange={e => setHour_entree(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Heure de sortie</label>
                      <input  type="time" name="first_name"  className="form-control" value={hour_sortie} placeholder="Prénom du client"onChange={e => setHour_sortie(e.target.value)}/>
                    </div>
              
                    <div className="form-group col-md-4">
                      <label>Creneau </label>
                      <select name="creneau" className="form-control"  onClick={e => setCreneau(e.target.value)}>
                        { similarCreneaux.map(creneau =>
                          <option  selected={getSelected(activity, creneau)} value={creneau.id}>{creneau.activity}</option>
                      )}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Modifier
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
  )
}
export default EditClient;




