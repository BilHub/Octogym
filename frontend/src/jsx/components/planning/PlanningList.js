import React, { useState , useEffect, useContext} from "react";
// import PlanningProvider from './PlanningState'
import { useGetAPI } from '../useAPI'
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from 'axios'
import Search from "../../layouts/Search";

const capitalizeFirstLetter = (word) => {
   if (word)
       return word.charAt(0).toUpperCase() + word.slice(1);
   return '';
};
function refreshPage() {
   window.location.reload(false);
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
                <Dropdown.Item href={`/planning/edit/${props.id}`}>Modifier</Dropdown.Item>
                
                {/* <Dropdown.Item type='button' className="text-danger" onClick={ console.log('hello delete')}> */}
                <Dropdown.Item type='button' className="text-danger" onClick={ async () => {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/rest-api/planning/delete/${props.id}`)
                    refreshPage()
                    }}>
                   Supprimer
                </Dropdown.Item>
             </Dropdown.Menu>
          </Dropdown>
   };





const PlanningList = () => {
    let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/planning/`
   //  let deletePoint = `${process.env.REACT_APP_API_URL}/rest-api/planning/delete/${id}`
    const savedPlannings = useGetAPI(endpoint)
    return (
       <div className="">
           <Search  name='Planning' lien='/planning/create/'/>
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
                                 <th className="pl-5 width200"> Salle De Sport </th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {savedPlannings.map(plan =>  (
                              <tr role="row" key={plan.id} className="btn-reveal-trigger">
                                 <td className="customer_shop_single"> {plan.id} </td>
                                 <td className="py-3">
                                    <Link to={`/clients/${plan.id}`}>
                                       <div className="media d-flex align-items-center">
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {capitalizeFirstLetter(plan.name)}
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">{capitalizeFirstLetter(plan.salle_name)}</td>
                                 <td className="py-2 text-right">
                                    <Drop id={plan.id}/>
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
         </div>
      

    )
}
export default PlanningList;