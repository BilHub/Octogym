import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI, usePostAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import PageTitle from "../../layouts/PageTitle";

// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import useForm from 'react-hook-form';
import createPalette from "@material-ui/core/styles/createPalette";
function refreshPage() {
  window.location.reload(false);
}
const SalleActiviteCreateModal = ({show, onShowShange}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
    const salleActiviteCreateEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/create`

const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [numberOfDays, setNumberOfDays] = useState('')
const [seancesQuantity, setSeancesQuantity] = useState('')
const [activity, setActivity] = useState([])
const [selectedActivities, setSelectedActivities] = useState([])
    const HandleSubmit = async e => {
        e.preventDefault();
        const ebonnementFormData = {
            name : name,
        }
        console.log(" =================> new Creneau ", ebonnementFormData);
        await usePostAPI(salleActiviteCreateEnd, ebonnementFormData)

        refreshPage()
        handleShow()
      }
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl"onHide={handleShow} show={show}>
    <Modal.Header>
      <Modal.Title className='text-black'>Creer un nouvel abonnement </Modal.Title>
      <Button
          variant=""
          className="close"
          onClick={handleShow}
          >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={HandleSubmit}>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nom </label>
              <div className="col-sm-9">
                  <input type="text" value={name} className="form-control" placeholder="..." onChange={e => setName(e.target.value)}/>
              </div>
          </div>
          

          <div className="form-group row">
              <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                      Valider
                  </button>
              </div>
          </div>
      </form>
     </Modal.Body>

    </Modal>
)

}
export default SalleActiviteCreateModal;