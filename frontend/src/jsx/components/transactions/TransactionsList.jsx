import React, { Fragment , useState, useEffect} from "react";
import PageTitle from "../../layouts/PageTitle";
import { Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import Search from "../../layouts/Search";
import ShortCuts from "../ShortCuts";
import { ToastContainer, toast } from 'react-toastify'
/// Transaction Modal
// import TransactionCreateModal from './TransactionCreateModal';
import PaiementCreateModal from './PaiementCreateModal';
import RemunerationCoachModal from './RemunerationCoachModal';
import RemunerationPersonnelModal from './RemunerationPersonnelModal';
import AutreCreateModal from './AutreCreateModal';
// import DetteCreateModal from './DetteCreateModal';
/// images 

import avartar5 from "../../../images/avatar/5.png";
import avartar1 from "../../../images/avatar/1.png";
import { Link } from "react-router-dom";
import { useGetAPI } from '../useAPI'
import { transformToNestObject } from "react-hook-form";

import {
   MuiPickersUtilsProvider,KeyboardDatePicker
 } from '@material-ui/pickers';
 import DateFnsUtils from '@date-io/date-fns';
 
function refreshPage() {
   window.location.reload(false);
 }
 const removeObject = async (props) => {
   let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/transactions/delete/`
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
         <Dropdown.Item href={`/client/edit/${props.id}`}>Modifier</Dropdown.Item>
         <Dropdown.Item type='button' className="text-danger" onClick={ async () => {
               await axios.delete(`${process.env.REACT_APP_API_URL}/rest-api/clients/delete/${props.id}/`)
               refreshPage()
               }}>
               Supprimer
            </Dropdown.Item>
      </Dropdown.Menu>
   </Dropdown>
};


const TransactionList = () => {

   const formatDate = (date) => {
      try {
         const returned = new Date(date).toISOString().slice(0, 10)
         return returned
      } catch (error) {
         const returned = new Date().toISOString().slice(0, 10)
         return returned
      }
   }
const [startDate, setStartDate] = useState(formatDate(new Date('2021-01-05')));
   const [endDate, setEndDate] = useState(formatDate(new Date()));
   const [paiementModal, setPaiementModal] = useState(false);
   const [autreModal, setAutreModal] = useState(false);
   const [remunerationCoachModal, setRemunerationCoachModal] = useState(false);
   const [remunerationPersonnelModal, setRemunerationPersonnelModal] = useState(false);
   const [detteModal, setDetteModal] = useState(false);
   // const [modal, setModal] = useState(false);
   const [presenceData, setPresenceData] = useState([]);
   const [searchValue, setSearchValue] = useState('')
   const [transData, setTransData] = useState([]);
   // const savedTransactions = useGetAPI(endpoint)
   // console.log('els clieeents', savedTransactions);
   const capitalizeFirstLetter = (word) => {
      if (word)
          return word.charAt(0).toUpperCase() + word.slice(1);
      return '';
   };

   // useEffect(() =>  {
   //    const dateDebut = formatDate(startDate)
   //    const dateFin = formatDate(endDate)
   //    if (searchValue !== '') {
   //       axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/?start_date=${dateDebut}&end_date=${dateFin}&search=${searchValue}`).then(res => {
   //          setTransData(res.data)
   //          console.log('le resultat des clients est ', res.data);
   //       })
   //    }else {

   //       axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/?start_date=${dateDebut}&end_date=${dateFin}&search=${searchValue}`).then(res => {
   //          setTransData(res.data)
   //          console.log('le resultat des clients est ', res.data);
   //       })}
   // }, [searchValue]);
const [nextpage, setNextpage] = useState(1);

   useEffect(() =>  {
      // axios.get(`${process.env.REACT_APP_API_URL}/rest-api/presence/?start_date=${startDate}&end_date=${endDate}`).then(res => {
      //    setStartDate(res.data.results)
      //    setEndDate(res.data.results)
      //    console.log('le resultat des clients est ', res.data);
      // })
      const presenceDateDate = async () => {
         // const page = nextpage
         const dateDebut = formatDate(startDate)
         const dateFin = formatDate(endDate)
         const result =  await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/?page=${nextpage}&start_date=${dateDebut}&end_date=${dateFin}`)
         console.log('result ', result);
         setTransData(result.data.results)
      }
   // }else {
   //    axios.get(endpoint).then(res => {
   //       setStartDate(res.data.results)
   //       setEndDate(res.data.results)
   //       console.log('le resultat des clients est ', res.data);
   //    })}
   presenceDateDate()
   }, [startDate, endDate,nextpage,paiementModal,remunerationCoachModal,remunerationPersonnelModal,autreModal]);
   return (
      <Fragment>
         <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag mb-4">
            <ShortCuts />
         </div>
            {/* <Search name= 'Abonnée' lien= "/client/create"/> */}
            <div className="row d-flex justify-content-arround mb-3">
                  <div className="btn btn-success ml-auto" onClick={e => setPaiementModal(true) }>
                  + Paiement 
                  </div>
                  {/* <div className="btn btn-success ml-auto" onClick={e => setDetteModal(true) }>
                  + Réglement Dette 
                  </div> */}
                  <div className="btn btn-danger ml-auto" onClick={e => setRemunerationPersonnelModal(true) }>
                  + Remunération Personnel 
                  </div>
                  <div className="btn btn-info ml-auto" onClick={e => setRemunerationCoachModal(true) }>
                  + Remunération Coach
                  </div>
                  <div className="btn btn-primary ml-auto" onClick={e => setAutreModal(true) }>
                  + Autre Transaction
                  </div>
                
               {/* <div>
                  <Link to='/' className="btn btn-success ml-auto">
                  + Nouvel  Transaction 
                  </Link>
               </div> */}
            {/* <div className=" col-lg-2">
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                     disableToolbar
                     variant="inline"
                     format="dd/MM/yyyy"
                     type="local"
                     id="date-picker-inline"
                     label="Date Début"
                     value={startDate}
                     onChange={date => {
                        setStartDate(date)
                        setEndDate(date)
                     
                     }}

                     KeyboardButtonProps={{
                        'aria-label': 'change date',
                     }}
                  />
                  
               </MuiPickersUtilsProvider>
               </div>
               <div className=" col-lg-2">

               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                     disableToolbar
                     variant="inline"
                     format="dd/MM/yyyy"

                     id="date-picker-inline"
                     label="Date Fin"
                     value={endDate}
                     style={{matginTop: '0px'}}
                     onChange={date =>setEndDate(date) }
                     KeyboardButtonProps={{ 'aria-label': 'change date', }}
                  />
               </MuiPickersUtilsProvider>
               </div> */}
                <div className="col-md-2">
                      <input type="date" name="birth_date" value={startDate} className="form-control"  onChange={e => setStartDate(e.target.value)}/>
               </div>
               <div className=" col-md-2">
                     <input type="date" name="birth_date" value={endDate} className="form-control"  onChange={e => setEndDate(e.target.value)}/>
               </div>
               {/* <div className="input-group search-area d-inline-flex">
               <div className="input-group-append">
                  <span className="input-group-text">
                     <i className="flaticon-381-search-2"/>
                  </span>
               </div>
               <input type="text" className="form-control" placeholder="rechercher un client" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
            </div> */}
            </div>

               {/* <div className="input-group search-area d-inline-flex col-lg-2">
                  <div className="input-group-append">
                     <span className="input-group-text">
                        <i className="flaticon-381-search-2"/>
                     </span>
                  </div>
                  <input type="text" className="form-control" placeholder="rechercher par client" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
               </div> */}

         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body" style={{padding: '5px'}}>
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                           <thead>
                              <tr>
                                 {/* <th className="customer_shop"> ID </th> */}
                                 <th>Date</th>
                                 <th>montant</th>
                                 <th>Type</th>
                                 <th className="pl-5 width200"> Nom </th>
                                 <th className="pl-5 width200">Note</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {transData.map(tran => (
                              <tr role="row" key={tran.id} className="btn-reveal-trigger presences">
                                 <td className="customer_shop_single">
                                       <div className="media d-flex align-items-center">
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {capitalizeFirstLetter(tran.date_creation)}
                                             </h5>
                                          </div>
                                       </div>
                                 </td>
                                 <td className="">
                                    <h5 style={ tran.type === 'remunerationProf' || tran.type === 'remuneration'  ? {color: '#FF2E2E'} : tran.type === 'paiement' || tran.type === 'assurance' ? {color: '#24a247'} :  {color: '#000000'}  }>{tran.amount}</h5>
                                 </td>
                                 <td className="">
                                  {tran.type === 'remunerationProf' ? 'Coach' : tran.type === 'paiement' ? capitalizeFirstLetter(tran.abonnement_name) : tran.type === 'remuneration'  ? 'Personnel' : tran.type === 'assurance' ? 'Frais Annuel' : 'Autre'} 
                                 </td>
                                     { tran.coach &&
                                       <td className=" ">
                                          <Link to={`/coach/${tran.coach.id}`} >
                                             {tran.coach.name} 
                                          </Link> 
                                       </td>
                                     }
                                     {tran.abonnement_client && 
                                       <td className=" "> 
                                          <Link to={`/client/${tran.client_id}`} >
                                             {tran.client_last_name}  
                                          </Link> 
                                       </td>
                                     }
                                       {tran.type === 'remuneration' &&
                                             <td className=" "> 
                                             {tran.client.name}
                                             </td>
                                       }
                                       {tran.type === 'autre' &&
                                             <td className=" "> 
                                             {tran.name}
                                             </td>
                                       }
                                       {tran.type === 'assurance' &&
                                             <td className=" "> 
                                             {tran.name}
                                             </td>
                                       }
                                 <td className=" pl-5"> { tran.notes } </td>
                                 {/* <td className="">30/03/2018</td> */}
                                 {/* <td className=" text-right">
                                    <Drop id={tran.id}/>
                                 </td> */}
                              </tr>
                              ))}
                              </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            {/* <TransactionCreateModal show={modal} onShowShange={setModal}/> */}
            <PaiementCreateModal show={paiementModal} onShowShange={setPaiementModal}/>
            <RemunerationCoachModal show={remunerationCoachModal} onShowShange={setRemunerationCoachModal}/>
            <RemunerationPersonnelModal show={remunerationPersonnelModal} onShowShange={setRemunerationPersonnelModal}/>
            <AutreCreateModal show={autreModal} onShowShange={setAutreModal}/>
         </div>
         <div className='d-flex text-center justify-content-end'>
            <div className='dataTables_info text-black' id='example5_info '>
            {/* Showing {activePag.current * sort + 1} to{' '}
            {data.length > (activePag.current + 1) * sort
               ? (activePag.current + 1) * sort
               : data.length}{' '}
            of {data.length} entries{' '} */}
            </div>
            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate' >
            <Button
               onClick={() =>
               nextpage > 0 && setNextpage(nextpage - 1)
            }
            style={{width: '100px', border: 'none', height:'48px', color:'#ffffff',textAlign: 'left', fontSize:'15px', paddingLeft:'8px'}}>
               Précédent
            </Button>
            <span>
                  <input
                  to='/transactions'
                  type='number'
                  className='paginate_button_client  '
                  onChange={e => setNextpage(e.target.value)}
                  value={nextpage}
                  style={{width: '100px', border: 'none', height:'99%', textAlign: 'center', fontSize:'15px'}}
                  />
            </span>
            <Button
            style={{width: '100px', border: 'none', height:'48px', color:'#ffffff',textAlign: 'center', fontSize:'15px', padding:'2px'}}

               onClick={() =>
               nextpage > 0 && setNextpage(nextpage + 1)
               }
            >
               Suivant
            </Button>
            </div>

         </div>
      </Fragment>
   );
};

export default TransactionList;
