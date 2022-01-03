import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useGetAPI, usePostAPI } from '../useAPI'
import {  useHistory } from "react-router-dom";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

 
function refreshPage() {
  window.location.reload(false);
}
const AutreCreate = () => {

  
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");


  //FK 

  const HandleSubmit = async e => {
  

    // console.log('les maladiiiies', maladies);
    let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/transactions/autre/create`
    e.preventDefault();
    const newClient = {
      amount : amount ,
      notes : notes ,
      name : name ,
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
                    <div className="form-group col-md-6">
                      <label>Nom</label>
                      <input type="text" name="amount" className="form-control" placeholder="Montant" onChange={e => setName(e.target.value)}/>
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
export default AutreCreate
;




