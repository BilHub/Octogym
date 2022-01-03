import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
// import productData from "../productData";
import axios from 'axios';
import { Tab, Button } from "react-bootstrap";
import { useGetAPI } from '../useAPI'

import product1 from "../../../images/product/1.jpg";
import Search from "../../layouts/Search";
import ModalEdit from "../widgets/Modal"
import { createContext } from "react";

const CoachDetail = (props) => {
   const [coach, setCoach] = useState({});

   const id = props.match.params.id;

let CoachDetailEndpoint = `${process.env.REACT_APP_API_URL}/rest-api/coach/${id}`
const coachData = useGetAPI(CoachDetailEndpoint) 
useEffect(() => {
  const coachSelected = coachData
  setCoach(coachSelected)
}, [coachData] );

const capitalizeFirstLetter = (word) => {
   if (word)
       return word.charAt(0).toUpperCase() + word.slice(1);
   return '';
};

  return (
    <>

      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/ecom-product-detail">Layout</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link to="/ecom-product-detail">Blank</Link>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                  {/* Tab panes */}
                  <Tab.Container defaultActiveKey="first">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <img className="img-fluid" src={product1} alt="image" />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
                {/*Tab slider End*/}
                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                  <div className="product-detail-content">
                    {/*Product details*/}
                    <div className="new-arrival-content pr">
                     
                      <p className="price">{capitalizeFirstLetter(coach.last_name)} {capitalizeFirstLetter(coach.first_name)} {coach.id}</p>
                      <h6>Type d'abonnement: <span className="item"></span> </h6>
                      <h6>Civilité: <span className="item">{coach.civility_display}</span> </h6>
                      <h6>Téléphone: <span className="item"><a href={`tel:${coach.phone}`}> {coach.phone}</a></span></h6>
                      <h6>email: <span className="item"><a href={`mailto:${coach.email}`}> {coach.email}</a></span></h6>
                      <h6>Groupe sanguin:&nbsp;&nbsp; <span className="badge badge-success light">{coach.blood}</span> </h6>
                      <h6>Adresse: <span className="item">{coach.adress}</span> </h6>
                      <h6>Nationalité: <span className="item">{coach.nationality}</span> </h6>
                      <h6>Date de naissance: <span className="item">{coach.birth_date}</span> </h6>
                      <h6>Etat: <span className="item">{coach.state_display}</span> </h6>
                      <h6>Note: <span className="item">{coach.note}</span> </h6>
                      <h6>Date d'adhesion: <span className="item">{coach.date_added}</span> </h6>
                 
                      <div className="shopping-cart mt-3">
                      <Link to={`/coach/edit/${coach.id}`} className="btn btn-primary ml-auto">
                            Modifier
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDetail;
