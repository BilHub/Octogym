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

const ProductDetail = (props) => {
  let maladiesEnd = `${process.env.REACT_APP_API_URL}/rest-api/maladie/`
  const maladies = useGetAPI(maladiesEnd)
   const [presence, setPresence] = useState({});



useEffect(() => {
   const id = props.match.params.id;
   const fetchData = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/presence/edit/${id}`);
         setPresence(res.data);
          console.log('ghirrrr', res.data);
      } catch (error) {
         console.log(error);
      }
   }
   fetchData();
}, [props.match.params.id] );

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
                     
                      <p className="price">{presence.client} {capitalizeFirstLetter(presence.client_last_name)} </p>
                     
                      <h6>Activité: <span className="item">{presence.client_activity}</span> </h6>
                      <h6>est dans la salle: <span className="item">{presence.is_in_salle}</span> </h6>
                      <h6>Heure d'entrée: <span className="item">{presence.hour_entree}</span></h6>
                      <h6>Heure de sortie: <span className="item">{presence.hour_sortie}</span></h6>
                      <h6>Date:&nbsp;&nbsp; <span className="badge badge-success light">{presence.date}</span> </h6>
                      
                     
                      <ul>
                      {/* { client.maladie_name.map(maladie =>
                          <div className="custom-control custom-checkbox mb-3">
                            <li className="custom-control-label" key={maladie.id} htmlFor={maladie.id}> {maladie.name}</li>
                          </div>
                        )} */}
                      </ul>
                      <h6>Maladie :{presence.maladies}</h6>
                      <div className="shopping-cart mt-3">
                      <Link to={`/client/edit/${presence.id}`} className="btn btn-primary ml-auto">
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

export default ProductDetail;
