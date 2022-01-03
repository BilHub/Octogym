import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
 
function refreshPage() {
  window.location.reload(false);
}
const CreneauEditModal = ({show, onShowShange, creneauData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])

    let creneauUpdateEND = `${process.env.REACT_APP_API_URL}/rest-api/creneau/${creneauData['creneauId']}/`
    const activities = creneauData['activities']  
    const coachs =  creneauData['coachs']
    const creneauCoach = creneauData['coach'] 
    const creneauActivite = creneauData['activite'] 
    const plannings = creneauData['plannings']  
    const creneauPlanning = creneauData['planning']
    const days = creneauData['days']
    const day = creneauData['day']
    const clients = creneauData['clients']
    const [creneauDetail, setCreneauDetail] = useState({})
    const startHour = creneauData['startHour']
    const endHour = creneauData['endHour']

    // const [newActivity, setNewActivity] = useState(activities[creneauActivite].id)
    // const [newCoach, setNewCoach] = useState(coachs[creneauCoach].id)
    // const [newStartHour, setNewStartHour] = useState(startHour)
    // const [newEndHour, setNewEndHour] = useState(endHour)
    // const [newDay, setNewDay] = useState(days[day].day)
    // const [newPlanning, setNewPlanning] = useState(plannings[creneauPlanning].id)

    const [newActivity, setNewActivity] = useState("")
    const [newCoach, setNewCoach] = useState("")
    const [newStartHour, setNewStartHour] = useState("")
    const [newEndHour, setNewEndHour] = useState("")
    const [newDay, setNewDay] = useState("")
    const [newPlanning, setNewPlanning] = useState("")


    
    useEffect(() => {
      // axios.get(creneauDetailEND).then((res) => {
      //   setCreneauDetail(res.data)
      //   console.log(res.data);
      if (creneauData['creneauId']) {
        setNewActivity(activities[creneauActivite].id)
        setNewCoach(coachs[creneauCoach].id)
        setNewStartHour(startHour)
        setNewEndHour(endHour)
        setNewDay(days[day].day)
        setNewPlanning(plannings[creneauPlanning].id)
        console.log('THE NEW CLIENT ONEEE ');
      }
        console.log('rani hab naafer creneau DATAAA============>'
        ,newActivity
        ,newEndHour
        ,newStartHour
        ,newDay
        ,newPlanning 
        ,newCoach
        ,clients
        );
    }, [creneauData['creneauId']])

    // }, [creneauData['creneauId']]);
    const handleSubmit = async e => {
      e.preventDefault();
      const newCreneau = {
        hour_start :newStartHour,
        hour_finish :newEndHour,
        day :newDay,
        coach :newCoach,
        planning :newPlanning,
        activity :newActivity,
      }
      // console.log(" =================> new Creneau ", newCreneau);
      await axios.put(creneauUpdateEND, newCreneau)
      refreshPage()
    }
   //  console.log('creneaux detail', activities);

return ( 

    <Modal className="fade bd-example-modal-lg" size="lg" show={show}>
    <Modal.Header>
      <Modal.Title>Creneau</Modal.Title>
      <Button
          variant=""
          className="close"
          onClick={handleShow}
          >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <div>
      <div className="col-xl-12 col-lg-6">
                  <div className="card">
                     <Tab.Container defaultActiveKey="monthly">
                        <div className="card-header border-0 d-xl-flex d-lg-block d-md-flex d-sm-flex d-block">
                           <div className="mr-2">
                              <h4 className="fs-20 text-black">
                                 Fiche Créneau
                              </h4>
                             
                           </div>
                           <div className="card-action card-tabs mt-3 mt-sm-0">
                              <Nav className="nav nav-tabs" role="tablist">
                                 <Nav.Item>
                                    <Nav.Link
                                       className="nav-link"
                                       data-toggle="tab"
                                       eventKey="monthly"
                                       role="tab"
                                       aria-selected="true"
                                    >
                                       Detail
                                    </Nav.Link>
                                 </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link   className="nav-link"   data-toggle="tab"   eventKey="Weekly"   role="tab"   aria-selected="false">
                                       Abonnées
                                    </Nav.Link>
                                 </Nav.Item>
                              </Nav>
                           </div>
                        </div>
                        <div className="card-body p-0 tab-content card-table">
                           <Tab.Content>
                                 {/* CRENEAUX DETAIL TAB */}
                              <Tab.Pane eventKey="monthly">
                                 {/* <div className="table-responsive m-2"> */}
                                  {/* <table className="table">
                                  <tbody> */}

                                 <form onSubmit={handleSubmit}>

                                 <div className="form-row">
                                    <div className="form-group col-md-6">
                                      <Autocomplete
                                        // id={(option) =>  option['id']}
                                        onChange={(event, value) => setNewActivity(value.id)}
                                        // onChange={handleSubmit}
                                        options={activities}
                                        value={activities[creneauActivite]}
                                        getOptionSelected={(option) =>  option['id']}
                                        getOptionLabel={(option) =>  option['name']}
                                        renderInput={(params) => <TextField {...params}  label="Activité" variant="outlined" fullWidth />}
                                      />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <Autocomplete
                                      onChange={(event, value) => setNewCoach(value.id)}
                                      options={coachs}
                                      value={coachs[creneauCoach]}
                                      getOptionLabel={(option) =>  option['last_name']}
                                      renderInput={(params) => <TextField {...params} label="Coach" variant="outlined" />}
                                    />
                                    </div>
                                    <div className="form-group col-md-6">
                                      <Autocomplete
                                        onChange={(event, value) => setNewPlanning(value.id)}
                                        options={plannings}
                                        value={plannings[creneauPlanning]}
                                        getOptionLabel={(option) =>  option['name']}
                                        renderInput={(params) => <TextField {...params} label="Planning" variant="outlined" />}
                                      />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <Autocomplete
                                      onChange={(event, value) => setNewDay(value.day)}
                                      options={days}
                                      defaultValue={days[day]}
                                      getOptionLabel={(option) =>  option['label']}
                                      renderInput={(params) => <TextField {...params} label="Jour" variant="outlined" />}
                                    />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <TextField
                                      type="time"
                                      defaultValue={startHour}
                                      label="Heure de Début"
                                      variant="outlined"
                                      onChange={e=> setNewStartHour(e.currentTarget.value)}
                                      // onChange={(event, value) => setNewStartHour(value)}
                                      fullWidth
                                    />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <TextField
                                      type="time"
                                      defaultValue={endHour}
                                      // value={creneauDetail.hour_finish}
                                      // className={classes.textField}
                                      variant="outlined"
                                      label="Heure de Fin"

                                      fullWidth
                                      // defaultValue={coachs[coach]}
                                      onChange={e => setNewEndHour(e.currentTarget.value)}
                                    />
                                    </div>
                                  </div>
                                 <Button
                                      onClick={handleShow}
                                      variant="danger light"
                                      className='m-2'
                                      >
                                      Fermer
                                  </Button>
                                  <Button variant="primary" type="submit">Sauvgarder</Button>
                                  </form>
                                  {/* </tbody>

                                  </table> */}

                                 {/* </div> */}
                              </Tab.Pane>
                                      {/* END CRENEAUX DETAIL TAB */}
                                      {/* CRENEAUX CLIENTS TAB */}
                              <Tab.Pane eventKey="Weekly">
                                 <div className="table-responsive">
                                    <table className="table">
                                       <tbody>
                                          {
                                             clients.map( client => (

                                        
                                          <tr>
                                             <td>
                                                <div className="media">
                                                   
                                                   <div className="media-body align-self-center">
                                                      <h5 className="font-w600 text-black">
                                                         {client.id}
                                                      </h5>
                                                      
                                                   </div>
                                                </div>
                                             </td>
                                             <td className="font-w600 text-center">
                                             {client.last_name}
                                             </td>
                                             <td>
                                                <Link
                                                   className="btn-link text-success float-right"
                                                   to={`/client/${client.id}`}
                                                >
                                                   Fiche client
                                                </Link>
                                             </td>
                                          </tr>
                                          
                                          ))}
                                         
                                       </tbody>
                                    </table>
                                 </div>
                              </Tab.Pane>
                                      {/* END CRENEAUX CLIENTS TAB */}
                              
                           </Tab.Content>
                        </div>
                     </Tab.Container>
                  </div>
               </div>
            
      </div>
     
    
     </Modal.Body>




     


    </Modal>
)

}
export default CreneauEditModal;