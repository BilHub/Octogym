import React, { useState , useEffect, useContext} from "react";
import { useGetAPI, usePutAPI } from '../useAPI'
import EventCalendar from "./EventCalendar";
import axios from 'axios';
import CreneauEditModal from './CreneauEditModal';
import {
   Row,
   Col,
   Card,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
   Button,
   Modal,
 } from "react-bootstrap";
import { Link } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const ModalState = React.createContext()


let sallesEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/`
let coachEnd = `${process.env.REACT_APP_API_URL}/rest-api/coachs/`
let planningEND = `${process.env.REACT_APP_API_URL}/rest-api/planning/`
let activitiesEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/activite`
const Calendar = () => {
  const activities = useGetAPI(activitiesEnd)
  const coachs = useGetAPI(coachEnd)
  const plannings = useGetAPI(planningEND)
    const salles = useGetAPI(sallesEnd)
    const [modal, setModal] = useState(false);
  const [activity, setActivity] = useState('1');

  const [samedi, setSamedi] = useState([]);
  const [dimanche, setDimanche] = useState([]);
  const [lundi, setLundi] = useState([]);
  const [mardi, setMardi] = useState([]);
  const [mercredi, setMercredi] = useState([]);
  const [jeudi, setJeudi] = useState([]);
  const [vendredi, setVendredi] = useState([]);
  const [selectedCreneau, setSelectedCreneau] = useState("")
  const [creneauActi, setCreneauActi] = useState("")
  const [creneauCoach, setCreneauCoach] = useState("")
  const [creneauPlanning, setCreneauPlanning] = useState("")
  // console.log('dfrovnfdlkvbnfbkfnbfdkbn<<<<<<<<<<<<<', plannings);
    let result1=[]
    let result2=[]
    let result3=[]
    let result4=[]
    let result5=[]
    let result6=[]
    let result7=[]
    useEffect(() => {

      axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}`)
  .then(function (response) {

    console.log('ACTIVITY',activity);
    response.data.forEach((req) => {
         if (req.day == "SA") {
                console.log('req.day', req.day);
                result1.push(req);
              }else if(req.day== "DI"){
                      result2.push(req);
                    }else if (req.day== "LU"){
                      result3.push(req);
                    }else if(req.day== "MA"){
                      result4.push(req);
                    }else if(req.day== "ME"){
                      result5.push(req);
                    }else if(req.day== "JE"){
                      result6.push(req);
                    }else if(req.day== "VE"){
                      result7.push(req);
                    }
                 
        })
                  console.log('req.dsdcvdcvscay', result1);
                  
                  setSamedi(result1)
                  setDimanche(result2)
                  setLundi(result3)
                  setMardi(result4)
                  setMercredi(result5)
                  setJeudi(result6)
                  setVendredi(result7)
                })
  
}, [activity]);

  console.log('sected creneaux', selectedCreneau);

const handleSelectedCreneau = (e) => {
  setSelectedCreneau(e.target.name)
  setModal(true)
}

 const getActivity = (acti,creneauActi) => {
  console.log('acti w acti', acti);
  console.log('creneau w creneau', creneauActi);
  for (let i = 0; i < acti.length; i++) {
    if (creneauActi == acti[i].id){
       return i
      }            
  }
}


   return (
      <div className="h-80">
         <PageTitle activeMenu="Planning" motherMenu="App" />
         <div>
         <div className="form-group col-md-4">
                      <label>Activitées</label>
                      <select   name="activities" className="form-control" onChange={e => setActivity(e.target.value)  }>
                      {salles.map( salle => (
                        <option value={salle.id} name={salle.name}>{salle.name}</option>
                      ))}
                      </select>
                    </div>
         <Col lg={12}>
          <Card>
            
            {/* <Card.Body> */}
            <Table responsive bordered className="verticle-middle">
              <tr>
                <th style={{verticalAlign: "middle", width: "150px", height:"150px"}}>
                      <h4>Dimanche</h4>
                </th>
                <td>
                { dimanche.map(day=>   ( 
                  
                   <td style={{border: "none", width: day.width}}  id={day.id}  onClick={e => {
                     setModal(true) 
                     setSelectedCreneau(day.id)
                     setCreneauActi(getActivity(activities, day.activity))
                     setCreneauCoach(getActivity(coachs, day.coach))
                     setCreneauPlanning(getActivity(plannings, day.planning))
                     
                    }
                     }>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}> {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                        </div>
                      </td> 
                    ))}

                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Lundi</h4>
                </th>
                <td style={{ padding: '3px'}}>
                { lundi.map(day=>   ( 
                      <td style={{border: "none", width: day.width, padding: '3px'}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-{day.id}</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mardi</h4>
                </th>
                <td>
                { mardi.map(day=>   ( 
                      <td style={{border: "none", width: day.width}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-{day.id}</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mercredi</h4>
                </th>
                <td>
                { mercredi.map(day=>   ( 
                      <td style={{border: "none", width: day.width}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Jeudi</h4>
                </th>
                <td>
                { jeudi.map(day=>   ( 
                      <td style={{border: "none", width: day.width}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Vendredi</h4>
                </th>
                <td>
                { vendredi.map(day=>   ( 
                      <td style={{border: "none", width: day.width}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Samedi</h4>
                </th>
                <td>
                { samedi.map(day=>   ( 
                      <td style={{border: "none", width: day.width}}>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>
                          -  
                          <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> 
                        </div>
                      </td> 
                    ))}
                </td>
              </tr>
              </Table>
                      <CreneauEditModal show={modal} onShowShange={setModal} valeur={selectedCreneau} activite={creneauActi} coach={creneauCoach} planning={creneauPlanning}/>
                      
          </Card>
        </Col>
         </div>
      </div>
   );
};

export default Calendar;
