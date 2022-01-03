import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useGetAPI, usePostAPI } from '../useAPI'
import {  useHistory } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

 
function refreshPage() {
  window.location.reload(false);
}
const RemCreate = () => {

  let personnelEnd = `${process.env.REACT_APP_API_URL}/rest-api/personnel/`
  // let abonnementEnd = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
  
  const personnels = useGetAPI(personnelEnd)
  
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [nom, setNom] = useState("");


  //FK 

  const HandleSubmit = async e => {
  

    // console.log('les maladiiiies', maladies);
    let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/transactions/remuneration/create`
    e.preventDefault();
    const newClient = {
      amount : amount ,
      notes : notes ,
      nom : nom
      }
      usePostAPI(endpoint, newClient)
      // history.push("/client")
      console.log('THE NEW CLIENT ', newClient);
    }
  return (
        <div className="">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Profile Abonné</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={HandleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Montant</label>
                      <input type="number" name="amount" className="form-control" placeholder="Montant" onChange={e => setAmount(e.target.value)}/>
                    </div>
               

                  </div>
                
                  
                  <div className="form-row">
                    
                    <div className="form-group col-md-4">
                      <label>Client</label>
                      <select defaultValue={"option"} name="creneau" className="form-control" onChange={e => setNom(e.target.value)}>
                        <option value="option" disabled>Cliquez pour choisir</option>
                        { personnels.map(personnel =>
                          <option value={personnel.id}>{personnel.last_name}</option>
                      )}
                      </select>
                    </div>
                    
                </div>
              
                  <div className="form-row">
                      <label>Note</label>
                      <textarea name="note" className="form-control" onChange={e => setNotes(e.target.value)}/>
                </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Creer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}
export default RemCreate ;




