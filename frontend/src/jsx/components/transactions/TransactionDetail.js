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

const TransactionDetail = (props) => {
  // let maladiesEnd = `${process.env.REACT_APP_API_URL}/rest-api/transactions/${props.type}/${id}`
   const [trans, setTrans] = useState({});
   const id = props.match.params.id;
  // const trandDetailEnd = `${process.env.REACT_APP_API_URL}/rest-api/transactions/detail/${type}/${id}`
  // const trandDetailEnd = `${process.env.REACT_APP_API_URL}/rest-api/transactions/detail/${type}/${id}`


useEffect(() => {
   const fetchData = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/paiement/${id}`);
         setTrans(res.data);
          console.log('ghirrrr', res.data);
      } 
      
      catch (error) {
         try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/autre/${id}`);
          setTrans(res.data);
           console.log('ghirrrr', res.data);
         } catch (error) {
           try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/assurance/${id}`);
            setTrans(res.data);
             console.log('ghirrrr', res.data);
           } catch (error) {
           try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/remuneration/${id}`);
            setTrans(res.data);
             console.log('ghirrrr', res.data);
           } catch (error) {
             try {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/transactions/remunerationProf/${id}`);
              setTrans(res.data);
               console.log('ghirrrr', res.data);
             } catch (error) {
               console.log('il ya une erreur lors du get transaction detail', error);
             }
           }
           }
         }
      }
   }
   fetchData();
}, [] );

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
                     
                      <p className="price">{capitalizeFirstLetter(trans.amount)} {capitalizeFirstLetter(trans.amount)} {trans.id}</p>
                     
                      <h6>Type d'abonnement: <span className="item"></span> </h6>
                      <h6>Civilité: <span className="item">{trans.amount}</span> </h6>
                      <h6>Groupe sanguin:&nbsp;&nbsp; <span className="badge badge-success light">{trans.last_modified}</span> </h6>
                      <h6>Adresse: <span className="item">{trans.notes}</span> </h6>
                      <h6>Nationalité: <span className="item">{trans.nationality}</span> </h6>
                      <h6>Date de naissance: <span className="item">{trans.type}</span> </h6>
                      <h6>Etat: <span className="item">{trans.client}</span> </h6>
                      <h6>Note: <span className="item">{trans.nom}</span> </h6>
                      <h6>Creneau: <span className="item">{trans.type}</span> </h6>
                      <ul>
                      {/* { client.maladie_name.map(maladie =>
                          <div className="custom-control custom-checkbox mb-3">
                            <li className="custom-control-label" key={maladie.id} htmlFor={maladie.id}> {maladie.name}</li>
                          </div>
                        )} */}
                      </ul>
                      <div className="shopping-cart mt-3">
                      <Link to={`/transactions/edit/${trans.id}`} className="btn btn-primary ml-auto">
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

export default TransactionDetail;
