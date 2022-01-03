import React, { useState , useEffect, useContext} from "react";

import axios from 'axios';
import { useGetAPI, usePutAPI } from '../../useAPI'
import {
   Row,
   Col,
   Card,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
 } from "react-bootstrap";

const StepTwo = (props) => {
   
   let acivitiesEnd = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/activite/`
   
   let abonClient = `${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/${props.abonId}/`
   console.log('the new abon id uri', abonClient);

   const [acti, setActi] = useState([]); // les activites de labonnements
   const [activity, setActivity] = useState(0); //l'activité passé en parametres A l url
   
   // const abonnement = useGetAPI(abonClient)
useEffect(() => {
   axios.get(abonClient)
   .then(res => {
     console.log('the data ligne 29', res.data);
     setActivity(res.data.activity[0].id)
     setActi(res.data.activity)
   }) 
   
  }, []);

  // let samediEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=SA`)
  // let dimancheEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=DI`)
  // let lundiEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=LU`)
  // let mardiEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=MA`)
  // let mercrediEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=ME`)
  // let jeudiEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=JE`)
  // let vendrediEnd = axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}&day=VE`)


   console.log('ceci est un abonnement',acti);

   const [samedi, setSamedi] = useState([]);
   const [dimanche, setDimanche] = useState([]);
   const [lundi, setLundi] = useState([]);
   const [mardi, setMardi] = useState([]);
   const [mercredi, setMercredi] = useState([]);
   const [jeudi, setJeudi] = useState([]);
   const [vendredi, setVendredi] = useState([]);


   let result1=[]
   let result2=[]
   let result3=[]
   let result4=[]
   let result5=[]
   let result6=[]
   let result7=[]

   useEffect(() => {
    // const test= axios.all([actiEnd]).then( (response) =>{
    //   //  data1= response[0].data
    //   })
      axios.get(`${process.env.REACT_APP_API_URL}/rest-api/creneau/?act=${activity}`)
  .then(function (response) {
    
    // setData1(response.data);
    // console.log('DATA 1',data1);
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
                  console.log('set samedi', samedi);
                  setDimanche(result2)
                  setLundi(result3)
                  setMardi(result4)
                  setMercredi(result5)
                  setJeudi(result6)
                  setVendredi(result7)
                })
  
}, [activity]);

   return (
      <div className="h-80">
     
      <div>
{acti &&
      <div className="form-group col-md-4">
      <label>Activitées</label>
      <select  name="civility"  className="form-control" onChange={e => setActivity(e.target.value)}>
      {acti.map( acti => (
        <option value={acti.id} >{acti.name}</option>

        ))}
      </select> 
</div>
}
      <Col lg={12}>
       <Card>
         <Card.Header>
           <Card.Title> Planning Hebdomadaire</Card.Title>
         </Card.Header>
         <Card.Body>
           <Table responsive bordered className="verticle-middle">
             <tr>
               <th>Samedi</th>
               <th>dimanche</th>
               <th>lundi</th>
               <th>mardi</th>
               <th>mercredi</th>
               <th>jeudi</th>
               <th>vendredi</th>
             </tr>
             <tbody>
              <tr>
                <td  style={{verticalAlign: "top"}}> { samedi.map(day=>   (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { dimanche.map(day=> (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { lundi.map(day=>    (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { mardi.map(day=>    (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { mercredi.map(day=> (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { jeudi.map(day=>    (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
                <td style={{verticalAlign: "top"}}> { vendredi.map(day=> (  <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}><h5 style={{color: "#ffffff"}}>de: {day.hour_start}</h5>  -  <h5 style={{color: "#ffffff"}}> A :{day.hour_finish}</h5> <h6 style={{color: "#ffffff"}}>-{day.coach}-</h6> </div>))}</td>
              </tr>
                
             </tbody>
           </Table>
        </Card.Body>
       </Card>
     </Col>
      </div>
   </div>
   );
};

export default StepTwo;
