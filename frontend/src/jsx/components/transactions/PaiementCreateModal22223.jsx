import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
function refreshPage() {
  window.location.reload(false);
}
const PaiementCreateModal = ({show, onShowShange, transactionData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])

    const {register, handleSubmit, errors, control } = useForm();

    let paiementCreateEnd = `${process.env.REACT_APP_API_URL}/rest-api/transactions/paiement/create`
    let abonnementTypeEnd = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
    let clientsEnd = `${process.env.REACT_APP_API_URL}/rest-api/clients/`

   const [people, setPeople] = useState([])
   const [client, setClient] = useState("")
   const [erreur, seterreur] = useState(false)
   const [abonnement, setAbonnement] = useState("")
   const [note, setNote] = useState("")
   const clients = useGetAPI(clientsEnd)
   const abonnements = useGetAPI(abonnementTypeEnd)
/////// tst 
   const initialFormData = Object.freeze({
		client: '',
		abonnement: '',
		note: '',
		montant: '',
	});
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e, value) => {
    try {
      // updateFormData({client : value.id})
      // updateFormData({client : value.id})
      setClient(value.id)
      seterreur(false)

    } catch (error) {
      // updateFormData({client : ''})
      setClient('')
      seterreur(true)
    }
		// updateFormData({
		
		// 	// Trimming any whitespace
		// 	// [e.target.name]: e.target.value,
    
		// 	// ['montant']: e.target.value,
		// 	// ['note']: e.target.value,
		// });
    console.log('=====', client)
	};
   //  useEffect(() => {
         // setPeople(clients)
      //   console.log('THE NEW CLIENT ONEEE ', res.data);

      //   setCreneauDetail(res.data)
      //   console.log(res.data);
      //   setNewActivity(activities[creneauActivite].id)
      //   setNewCoach(coachs[creneauCoach].id)
      //   setNewStartHour(startHour)
      //   setNewEndHour(endHour)
      //   setNewDay(days[day].day)
      //   setNewPlanning(plannings[creneauPlanning].id)
       
   //  }, [])

    // }, [transactionData['creneauId']]);
    const handleSubmit = e => {
      e.preventDefault();
      const newTransaction = {
         client: Number(client),
         type : Number(abonnement),
        }
        if (note !== "") {
          newTransaction.note =note
        }
        
      axios.post(paiementCreateEnd, newTransaction)
      refreshPage()
      console.log('creneaux detail', formData);
    }

return ( 

    <Modal className="fade bd-example-modal-lg" size="lg" show={show}>
    <Modal.Header>
      <Modal.Title>Paiement</Modal.Title>
      <Button
          variant=""
          className="close"
          onClick={handleShow}
          >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      
    <form onSubmit={handleSubmit}>
                                 <div className="form-row">
                                    <div className="form-group col-md-6">
                                      <Autocomplete
                                        // id={(option) =>  option['id']}
                                        onChange={handleChange}
                                        // onChange={handleSubmit}
                                        
                                        options={abonnements}
                                       //  value={activities[creneauActivite]}
                                        getOptionSelected={(option) =>  option['id']}
                                        getOptionLabel={(option) =>  option['name']}
                                        renderInput={(params) => <TextField {...params} name="abonnement" label="Abonnement" variant="outlined"  fullWidth />}
                                      />
                                    </div>
                                    <div className="form-group col-md-6">
                                      <Autocomplete
                                        // id={(option) =>  option['id']}
                                        onChange={((e, value) => {
                                          try {
                                            // updateFormData({client : value.id})
                                            // updateFormData({client : value.id})
                                            setClient(value.id)
                                            seterreur(false)
                                      
                                          } catch (error) {
                                            // updateFormData({client : ''})
                                            setClient('')
                                            seterreur(true)
                                          }
                                        })}
                                        // onChange={(event, value) => setClient({value.id && value.id : ''})}
                                        // onChange={handleSubmit}
                                        options={clients}
                                       //  value={activities[creneauActivite]}
                                        getOptionSelected={(option) =>  option['id']}
                                        getOptionLabel={(option) =>  (
                                           option['last_name'])}
                                        
                                        renderInput={(params) => <TextField {...params}  label="Client" name='client' variant="outlined" fullWidth />}
                                      />
                                      {erreur && <p style={{color:'red'}}>veuillez choisir un client pour le paiement</p>}

                                    </div>
                                    <div className="form-group col-md-6">
                                    
                                      <TextField 
                                      // inputRef={register({required : 'fjjjjj'})}
                                      name='montant'
                                        type="number"
                                      //   defaultValue={}
                                      label="Montant"
                                      variant="outlined"
                                      //   onChange={e=> setNewStartHour(e.currentTarget.value)}
                                        // onChange={(event, value) => setNewStartHour(value)}
                                        fullWidth
                                      />
                                      {/* {errors.montant && <p style={{color:'red'}}>{errors.montant.message}</p>} */}
                                    
                                    </div>
                                    <div className="form-group col-md-6">
                                    <TextField
                                      type="text"
                                      onChange={handleChange}

                                    //   defaultValue={endHour}
                                      // value={creneauDetail.hour_finish}
                                      // className={classes.textField}
                                      variant="outlined"
                                      label="Note"
                                      name='note'
                                      fullWidth
                                      // defaultValue={coachs[coach]}
                                    //   onChange={e => setNewEndHour(e.currentTarget.value)}
                                    />
                                    </div>
                                  </div>
                                 <Button
                                      onClick={handleShow}
                                      variant="danger light"
                                      className='m-2'
                                      >
                                      Annulé
                                  </Button>
                                  <Button variant="primary" type="submit">Confirmer</Button>
                                  </form>
     </Modal.Body>




     


    </Modal>
)

}
export default PaiementCreateModal;