import React, { Fragment , useState, useEffect} from "react";
import PageTitle from "../../layouts/PageTitle";
import { Dropdown } from "react-bootstrap";
import axios from 'axios';
import Search from "../../layouts/Search";

/// images
import avartar5 from "../../../images/avatar/5.png";
import avartar1 from "../../../images/avatar/1.png";
import { Link } from "react-router-dom";
import { useGetAPI, usePostAPI } from '../useAPI'




export const ClientContext = React.createContext()
// function refreshPage() {
//    window.location.reload(false);
//  }
function refreshPage() {
   window.location.reload(false);
 }
 const removeObject = async (props) => {
   let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/presence/delete/`
   await axios.delete(endpoint + props.id)
  }
const Drop = (props) => {
   return <Dropdown>
            <Dropdown.Toggle variant="" className="table-dropdown i-false">
               <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                     <rect x="0" y="0" width="24" height="24"></rect>
                     <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                     <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                     <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                  </g>
               </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
               <Dropdown.Item href={`/presence/edit/${props.id}`}>Modifier</Dropdown.Item>
               <Dropdown.Item type='button' className="text-danger" onClick={ async () => {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/rest-api/presence/delete/${props.id}/`)
                    refreshPage()
                    }}>
                   Supprimer
                </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
};

const PresenceList = () => {
   const [client, setClient ] = useState('')
   const [presenceId, setPresenceId ] = useState('')
   const [ presenceParSalle, setPresenceParSalle]=useState([
      {"salle_name" : "salle1","salle_color" : "#DC3CCC",  "presence": "25"},
      {"salle_name" : "salle2", "salle_color" : "#FFF9EF","presence": "26"},
      {"salle_name" : "salle3","salle_color" : "#F4FAFD", "presence": "14"},
      {"salle_name" : "salle4","salle_color" : "#EEEEEE", "presence": "20"},
      
   ])
   
   let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/presence/`
   

   const [presenceData, setPresenceData] = useState([]);
   const savedPresences = useGetAPI(endpoint)
   console.table('els clieeents', savedPresences);
   const capitalizeFirstLetter = (word) => {
      if (word)
          return word.charAt(0).toUpperCase() + word.slice(1);
      return '';
   };
   let presenceCreateEND =  `${process.env.REACT_APP_API_URL}/rest-api/presence/create`
   let clientDetailEND =  `${process.env.REACT_APP_API_URL}/rest-api/client${client}/`
   let presenceDetailEND =  `${process.env.REACT_APP_API_URL}/rest-api/presence/${presenceId}/`

   // const getIdPresence = (client) => {
   //    axios.get(`${process.env.REACT_APP_API_URL}/rest-api/clients/${client}/`).then(function (res) {
   //       console.log('the last dataaa presence,', res.data.last_presence, client);
   //       setPresenceId(res.data.last_presence)
   //       // return res.data.last_presence
   //    })

   // }
   const HandleSubmit = (e) => {
         e.preventDefault();
         const clientId = {client : Number(client)}
         // getIdPresence(client)
         axios.get(`${process.env.REACT_APP_API_URL}/rest-api/clients/${client}/`).then(res=> {
            if (res.data.last_presence) {
               
               console.log('id de la presence', res.data.last_presence);
               setPresenceId(res.data.last_presence)
               console.log('erreur lors du cposr ligne 85', presenceId);
               axios.patch( `${process.env.REACT_APP_API_URL}/rest-api/presence/edit/${res.data.last_presence}/`)
            }else {

               axios.post(presenceCreateEND, clientId)
            }
         }).catch( err => {

            console.log('erreur lors du cposr',err);
         }

      )}


   // const HandleSubmit = (e) => {
   //    e.preventDefault();
   //    const clientId = {client : Number(client)}
   //    // getIdPresence(client)
   //    axios.post(presenceCreateEND, clientId).then(res=> {
   //       // console.log('id de la presence', res.data.last_presence);
   //       // setPresenceId(res.data.last_presence)
   //       // console.log('erreur lors du cposr ligne 85', presenceId);
   //       // axios.patch( `${process.env.REACT_APP_API_URL}/rest-api/presence/edit/${res.data.last_presence}/`)
   //    }).catch( err => {

   //       axios.get(`${process.env.REACT_APP_API_URL}/rest-api/clients/${client}/`).then(res=> {
   //          console.log('id de la presence', res.data.last_presence);
   //          setPresenceId(res.data.last_presence)
   //          console.log('erreur lors du cposr ligne 85', presenceId);
   //          axios.patch( `${process.env.REACT_APP_API_URL}/rest-api/presence/edit/${res.data.last_presence}/`)
   //       })
   //    }

   // )}




   return (
      
      
      <Fragment>
      
         <PageTitle activeMenu="Liste" motherMenu="Abonnées" />
         <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
             
            <div className="input-group search-area d-inline-flex">
               <div className="input-group-append">
                  {/* <span className="input-group-text">
                     <i className="flaticon-381-search-2" />
                  </span> */}
               </div>
               
               <form onSubmit={HandleSubmit}>

               <input type="text" className="form-control" placeholder="ID client" onChange={e => { 
                  setClient(e.target.value)
                  
                  }} />
               </form>
            </div>
            {/* <Link  className="btn btn-primary ml-auto">
                  + Nouvel   presenceParSalle
            </Link> */}
         </div>
         <div className="row"> 
         {presenceParSalle.map(presence => (<div className="col-xl-2 col-xxl-3 col-lg-3 col-sm-3">
                  <div className="card overflow-hidden">
                     <div className="card-header border-0 pb-0" style={{backgroundColor: presence.salle_color}}>
                        <div className="mr-auto"  >
                           <h2 className="text-black mb-2 font-w600">
                              {presence.presence}
                           </h2>
                           <p className="mb-1 fs-13">
                              
                              {presence.salle_name}
                           </p>
                        </div>
                        {/* <img src={bit_1} alt="" /> */}
                     </div>
                     <div className="card-body p-0">
                        {/* <canvas id="widgetChart1" height={75} /> */}
                      
                     </div>
                  </div>
               </div> ))}
               
            </div>
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                           <thead>
                              <tr>
                                 <th className="customer_shop"> ID </th>
                                 <th>Nom</th>
                                 <th>Activité</th>
                                 <th> Date </th>
                                 <th className="pl-5 width200"> Heure d'entrée </th>
                                 <th> Heure de sortie </th>
                                 {/* <th>Adhesion</th>
                                 <th></th> */}
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {savedPresences.map(presence => (
                              <tr role="row" key={presence.id} className="btn-reveal-trigger">
                                                
                                 <td className="customer_shop_single"> {presence.client} </td>
                                 <td className="py-3">
                                    <Link to={`/presence/detail/${presence.id}`}>
                                       <div className="media d-flex align-items-center">
                                        
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {presence.client_last_name}
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                
                                 
                                             
                                 <td className="py-2">{presence.client_activity}</td>
                                 <td className="py-2">{presence.date}</td>
                                 <td className="py-2 pl-5 wspace-no"> {presence.hour_entree} </td>
                                 <td className="py-2">{presence.hour_sortie}</td>
                                 <td className="py-2 text-right">
                                    <Drop id={presence.id}/>
                                 </td>
                              </tr>
                              ))}
                              </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default PresenceList;
