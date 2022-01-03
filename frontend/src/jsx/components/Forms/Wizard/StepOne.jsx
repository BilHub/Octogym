import React , { useState, useEffect, useCallback  }  from "react";
import { useGetAPI, usePostAPI } from '../../useAPI'
import axios from 'axios'
import { ClientContext } from '../../clients/ClientEdit'
import StepTwo from "./StepTwo";

const StepOne = () => {
  let abonCreateEnd = `${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/create`
  let abonnementsURI = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
  const abonnements = useGetAPI(abonnementsURI)
  const [abon, setAbon] = useState()
  const clientId = ClientContext._currentValue
  const [showState, setShow] = useState(false)
  const [newAbonId, setNewAbonId] = useState()
//   const [newAbonId, setNewAbonId] = useState(false)

const HandleCreateAbonSubmit = async e => {
   console.log("setSelectedMaladie=======> ", abon);
 // console.log('les maladiiiies', maladies);
//  let endpoint = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
      e.preventDefault();
      const newAbonnement = {
         client:Number(clientId),
         type_abonnement:Number(abon),
      }
 // history.push("/client")
   //const hello = usePostAPI(abonCreateEnd, newAbonnement)
   
     

      //  here was the ultimate war
      axios.post(abonCreateEnd,newAbonnement )
      .then(res => {
         setNewAbonId(res.data.id )
         setShow(true)
        console.log('les activites', res.data);
      }) 
  
      

   // const postAPI = async (endpoint, postData) =>  
   //await axios.post(endpoint, postData)
   
   }
 const handleClientId = useCallback()
   return (
      <section>
             {showState === false &&
               <form onSubmit={HandleCreateAbonSubmit}>
               <div className="row">
                  <div className="form-group col-md-4">
                     <label>Activitées</label>
                     <select  defaultValue={"option"} name="civility"  className="form-control" onChange={e => setAbon(e.target.value)}>
                        <option value="option" disabled>Cliquez pour choisir</option>
                           {abonnements.map( acti => (
                              <option value={acti.id} >{acti.name}</option>
                           ))}
                        </select>
                  </div>
               </div>
                  <div>
                     <button type="submit" className="btn btn-primary">
                        Suivant
                     </button>
                  </div>
               </form>
            }
         {showState === true &&
            <div>
               <StepTwo abonId={newAbonId} />
            </div>
         }
      </section>
   );
};

export default StepOne;
