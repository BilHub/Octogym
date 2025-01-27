import React, { Fragment, useState, useEffect , useCallback} from "react";
import { Dropdown, Tab, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useGetAPI, usePutAPI } from '../useAPI'
// import { notifyTopRight } from '../widgets/alertes'
import ShortCuts from "../ShortCuts";

// imeges
import bit_1 from "../../../images/svg/bitcoin-1.svg";
import bit_2 from "../../../images/svg/ethereum-1.svg";
import bit_3 from "../../../images/svg/ripple-1.svg";
import bit_4 from "../../../images/svg/litecoin-1.svg";
import { ToastContainer, toast } from 'react-toastify'

// Chart
import WidgetChart1 from "../Dhrev/Home/chart/WidgetChart1";
import WidetChart2 from "../Dhrev/Home/chart/WidetChart2";
import WidetChart3 from "../Dhrev/Home/chart/WidetChart3";
import WidetChart4 from "../Dhrev/Home/chart/WidetChart4";
import ActivityLine from "../Dhrev/Home/chart/ActivityLine";
import ActivityLine2 from "../Dhrev/Home/chart/ActivityLine2";
import ActivityLine3 from "../Dhrev/Home/chart/ActivityLine3";
import Donut from "../Dhrev/Home/chart/Donut";

import axios from 'axios';
import PerfectScrollbar from "react-perfect-scrollbar";

// Slider
import CardSlider from "../Dhrev/Home/slider/CardSlider";
import Contacts from "../Dhrev/Home/slider/Contacts";

import AbonnementCreateModal from './AbonnementCreateModal';
import AbonnementEditModal from './AbonnementEditModal';
import SalleActiviteCreateModal from './SalleActiviteCreateModal'
import PlanningCreateModal from './PlanningCreateModal'
import SalleActiviteEditModal from './SalleActiviteEditModal'
import ActivityCreateModal from './ActivityCreateModal'
import ActivityEditModal from './ActivityEditModal'
import PlanningEditModal from './PlanningEditModal'
import AbonnementListModal from './AbonnementListModal'
const Configuration = (props) => {
    const abonnementsListEND = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
    const activitiesEND = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/activite/`
    const salleActivitiesEND = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/`
    const planningsEND = `${process.env.REACT_APP_API_URL}/rest-api/planning/`
    
    const [ abonnements , setAbonnements] =useState([])

    const [ abonnementCreateModal , setAbonnementCreateModal] =useState(false)
    const [ salleActiviteCreateModal , setSalleActiviteCreateModal] =useState(false)
    const [ planningCreateModal , setPlanningCreateModal] =useState(false)
    const [ planningEditModal , setPlanningEditModal] =useState(false)
    const [ abonnementListModal , setAbonnementListModal] =useState(false)
    

    const [ salleActiviteEditModal , setSalleActiviteEditModal] =useState(false)
    const [ abonnementEditModal , setAbonnementEditModal] =useState(false)
    const [activityCreateModal, setActivityCreateModal] = useState(false)
    const [activityEditModal, setActivityEditModal] = useState(false)
    
    const [ selectedActivities, setSelectedActivities] = useState([])
    const [abonnementId, setAbonnementId] = useState('')
    const [activityId, setActivityId] = useState('')
    const [salleId, setSalleId] = useState('')
    const [planId, setPlanId] = useState('')
    const [planName, setPlanName] = useState('')
    const [salleName, setSalleName] = useState('')

    const [color, setColor] = useState("")
    const [salle, setSalle] = useState("")
    const [initEffect, setInitEffect] = useState(false)
    const [activityName, setActivityName] = useState("")
    const [abDuree, setAbDuree] = useState("")


    const [abIdFromList, setAbIdFromList] = useState("")
    
    
    const [lengthAbonnement, setLengthAbonnement] = useState('')


    // const [activity, setActivity] = useState([])
    // const [name, setName] = useState('')
    // const [price, setPrice] = useState('')
    // const [numberOfDays, setNumberOfDays] = useState('')
    // const [seancesQuantity, setSeancesQuantity] = useState('')
    
    
    // // const [abonnementId, setAbonnementId] = useState();
    // const [abonnementDetail, setAbonnementDetail] = useState();
    const [salllesActivities, setSalllesActivities] = useState([]);
    const [dureeInd, setDureeInd] = useState("");

    
    const [activities, setActivities] = useState([])
    const  DureeAb = [
        {mois :'1 Jour', jours : 1},
        {mois :'15 Jour', jours : 15},
        {mois :'45 Jour', jours : 45},
        {mois :'1 mois', jours : 30},
        {mois :'2 mois', jours : 60},
        {mois :'3 mois', jours : 90},
        {mois :'4 mois', jours : 120},
        {mois :'6 mois', jours : 180},
        {mois :'12 mois', jours : 360},
      ]
    useEffect(() => {
        axios.get(activitiesEND).then(res =>{
            setActivities(res.data)
        })
    }, [activityCreateModal,  activityEditModal]);
    useEffect(() => {
        axios.get(salleActivitiesEND).then(res =>{
            setSalllesActivities(res.data)
        })
    }, [salleActiviteCreateModal]);

    // useEffect(() => {
    //     setDureeInd(DureeAb.findIndex(x => x.jours === Number(abDuree)))
    //     console.log('dureee de labonnement', DureeAb.findIndex(x => x.jours === Number(abDuree)));
    //  }, [abDuree, abonnementCreateModal]);

    // const salllesActivities = useGetAPI(salleActivitiesEND)
    const [plannings, setPlannings] = useState([]);
    useEffect(() => {
    axios.get(planningsEND).then(res => {
        setPlannings(res.data)
    })
    }, [planningEditModal, planningCreateModal]);
    const getAbonnementsActitivties = (actiAbon) => {
        const provActiId = []
        const indexesList = []
        for (let i = 0; i < salllesActivities.length; i++) {
          const element = salllesActivities[i];
          provActiId.push(element.id)
        }
        console.log(provActiId);
        for (let i = 0; i < actiAbon.length; i++) {
          const acti = actiAbon[i];
          const index = provActiId.indexOf(acti) 
          // console.log('indexes', indexes);
          indexesList.push(salllesActivities[index])
        }
        return indexesList    
    }
    const setSelectedSalle = (salles, salleId ) => {
        for (let i = 0; i < salles.length; i++) {
            if (salleId == salles[i].id){
               return i
            }            
        }
    }
    const getFkIndex = (list,selctedItem) => {
        for (let i = 0; i < list.length; i++) {
          if (selctedItem === list[i].id){
              console.log('the activiti salle ID',i);
             return i
            }            
        }
      }
//  testFunc is the function to send data from child to parent # is triggered from the child
    const TestFunc = useCallback((abId, acti) =>  {
        if (abId !== '') {
            setAbIdFromList(abId)
            //    console.log('rani HNA RANI ROHT', abId);
            //    console.log('rani HNA RANI ACTIIIII', acti);
            setAbonnementId(abId)
            setSelectedActivities(getAbonnementsActitivties(acti))
            setAbonnementEditModal(true)
            }
        }, [abonnementListModal])

    // const setData = (e) => {
    //     setSalleId(salle.id)
    //     setSalleName(salle.name)
    // } 
    
    // useEffect(() => {
    //     setSalleId(salle.id)
    //     setSalleName(salle.name)
    //     console.log(" i'm running", initEffect);
    // }, [initEffect]);
            const getDureeIndex = (duree) => {
                const laDuree =DureeAb.findIndex(x => x.jours === duree)
                console.log('selected duree', duree);
                return laDuree
            }
    useEffect(() => {
        //  const clientId = props.match.params.id;
         const fetchData = async () => {
            try {
               const res = await axios.get(abonnementsListEND);
               setAbonnements(res.data)
                console.log('ghirrrr =creneauxClient', abonnements);
            } catch (error) {
               console.log(error, 'erreur presneces');
            }
         }
         fetchData();
      }, [props.match.params.id, abonnementEditModal, abonnementCreateModal] );
      console.log('selected activities', selectedActivities);
   return (
      <Fragment>
         <>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
               <div className="input-group search-area d-inline-flex">
                  <div className="input-group-append">
                     <span className="input-group-text">
                        <i className="flaticon-381-search-2" />
                     </span>
                  </div>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Search here"
                  />
               </div>
               <Link to="/" className="btn btn-primary ml-auto">
                  + Add New Cyrpto
               </Link>
            </div> */}
            <div className="testimonial-one owl-right-nav owl-carousel owl-loaded owl-drag mb-4">
                <ShortCuts />
            </div>
            <div className="row no-gutters">
                

                <div className="col-lg-2 col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Planning</h4>
                            <Button onClick={e => { setPlanningCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                        <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th>Nom du planning </th>
                    </tr>
                  </thead>
                  <tbody>
                  {plannings.map( plan => (
                    <tr className='cursor-abonnement text-left' key={plan.id} onClick={e => {
                        // setplanActiviteEditModal(true)
                        setPlanId(plan.id)
                        setPlanName(plan.name)
                        setPlanningEditModal(true)
                        // setSelectedActivities(getsallesActitivties(salle.activity))
                    }}>
                      <td >{plan.name}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Salle</h4>
                            <Button onClick={e => { setSalleActiviteCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                        <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th>Nom de la salle </th>
                    </tr>
                  </thead>
                  <tbody>
                  {salllesActivities.map( salle => (
                    <tr className='cursor-abonnement text-left' key={salle.id} onClick={e => {
                        setInitEffect(true)
                        setSalleActiviteEditModal(true)
                        setSalleId(salle.id)
                        setSalleName(salle.name)
                        console.log(initEffect)
                        // setSelectedActivities(getsallesActitivties(salle.activity))
                    }}>
                      <td >{salle.name}</td>
                    </tr>
                  ))}
                    </tbody>
                    </table>
                        </div>
                    </div>
                </div>

                {/* type abonnement va au modal */}
                <div className="col-xl-4 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Activitées</h4>
                            <Button onClick={e => { setActivityCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                            <PerfectScrollbar   style={{ height: "370px" }}   id="DZ_W_TimeLine" className="widget-timeline dz-scroll height370 ps ps--active-y" >
                                <div className="table-responsive card-table">
                                    <table className="table text-center bg-warning-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Nom</th>
                                                <th >Salle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {activities.map( activity => (
                                            <tr className='cursor-abonnement' key={activity.id} onClick={e => {
                                                setActivityEditModal(true)
                                                setActivityId(activity.id)
                                                setActivityName(activity.name)
                                                setSalleId(getFkIndex(salllesActivities, activity.salle))
                                            }}>
                                                <td className="text-left">{activity.name}</td>
                                                <td >{activity.salle_name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
                
                <div className=" col-lg-4 config-tableaux">
                    <div className="card">
                        <div className="card-header">
                            <h4 onClick={e => setAbonnementListModal(true)} className="card-title ajouter">Type D'abonnement</h4>
                            <Button onClick={e => { setAbonnementCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                            <PerfectScrollbar   style={{ height: "370px" }}   id="DZ_W_TimeLine" className="widget-timeline dz-scroll height370 ps ps--active-y" >
                                <div className="table-responsive card-table">
                                    <table className="table text-center bg-warning-hover config-tableaux">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Abonnement</th>
                                                <th>Nombre de Séance </th>
                                                <th className="text-right">Nombre d'activités'</th>
                                                <th >Inscrits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {abonnements.map( abonnement => (
                                            <tr className='cursor-abonnement' key={abonnement.id} onClick={ async e => {
                                                setAbonnementEditModal(true)
                                                setAbonnementId(abonnement.id)
                                                setSelectedActivities(getAbonnementsActitivties(abonnement.salles))
                                                setAbDuree(abonnement.number_of_days)
                                                await setDureeInd(getDureeIndex(abonnement.number_of_days))
                                            }}>
                                                <td className="text-left">{abonnement.name}</td>
                                                <td>{abonnement.seances_quantity}</td>
                                                <td className="text-right">{abonnement.salles.length}</td>
                                                <td className="text-right">{abonnement.clients_number}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
        <div className="row">
            
        {/* <div className="col-xl-6 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Activités</h4>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Nom de la salle</label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="..." />
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
                            </div>
                        </div>
                    </div>
                </div> */}
                
        </div>
        <AbonnementCreateModal show={abonnementCreateModal} onShowShange={setAbonnementCreateModal} abonnementData={{abonnementId: abonnementId}} />
        <ActivityCreateModal show={activityCreateModal} onShowShange={setActivityCreateModal} activityData={{activityId: activityId, salllesActivities : salllesActivities }} />
        <ActivityEditModal show={activityEditModal} onShowShange={setActivityEditModal} activityData={{
            activityId: activityId,                      
            salllesActivities : salllesActivities, 
            color:color, salle: salle, 
            activityName: activityName, 
            salles: salllesActivities, 
            salleId:salleId}} />
        < SalleActiviteCreateModal  show={salleActiviteCreateModal} onShowShange={setSalleActiviteCreateModal}  />
        < PlanningCreateModal  show={planningCreateModal} onShowShange={setPlanningCreateModal}  />
        < PlanningEditModal  show={planningEditModal} onShowShange={setPlanningEditModal} planningData={{
            planId : planId,
            planName :planName ,
        }}  />
        < AbonnementListModal  show={abonnementListModal} onShowShange={setAbonnementListModal} abonnementData={TestFunc} />
        

        < SalleActiviteEditModal  show={salleActiviteEditModal} onShowShange={setSalleActiviteEditModal}  salleData={{
            salleId : salleId,
            salleName : salleName
            }} />
        <AbonnementEditModal show={abonnementEditModal} onShowShange={setAbonnementEditModal} 
        abonnementData={
            {
            abonnementId: abonnementId,
            selectedActivities: selectedActivities,
            activities : activities,
            salles: salllesActivities, 
            dureeInd: dureeInd
            }
            } />
         </>
      </Fragment>
   );
};

export default Configuration;
