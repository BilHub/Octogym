import React, { useState , useEffect, useReducer, useContext} from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { SalleContext } from './Salle';




const AddSalle = () => {
  const [salleName, setSalleName] = useState("");
  const [salleAdresse, setSalleAdresse] = useState("");
  const [sallePhone, setSallePhone] = useState("");
  // console.log(SalleContext);
  const { state, dispatch } = useContext(SalleContext);
  const value = useContext(SalleContext);

  const handleSubmit = e => {
    const salle_name= document.querySelector('#salle_name').value
    const salle_adresse= document.querySelector('#salle_adresse').value
    const salle_phone= document.querySelector('#salle_phone').value
    
    e.preventDefault();
    dispatch({type:'create', payload:[salle_name,salle_adresse, salle_phone]})
    
    setSalleName('')
    setSalleAdresse('')
    setSallePhone('')

    console.log(state.salles[-1], "INSIDE CREATE SALLE")
    // state.salles.splice(-1,1)
  }
  return (
    //<div>
      <div>
        {state.salles.map(salle =>  (
       <div onClick={() => dispatch({type:'delete', payload:salle})}>
         <ul>
           <li>{salle.name}</li>
           <li>{salle.adresse}</li>
           <li>{salle.phone}</li>
         </ul>
         </div>
        ))}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <form onSubmit={handleSubmit}>
          <input type="text" id="salle_name" name="name" value={state.name} />
            <label>name</label>
            <br/>
            
            <input type="text" id="salle_adresse" name="adresse" value={state.adresse} />
            <label>adresse </label>
            <br/>
          
            <input type="text" name="phone" id="salle_phone" value={state.phone} />
            <label>phone </label>
            <br/>
            <Button type="submit" >Submit</Button>
        </form>
         


      </div>
 // </div>
  );
}
export default AddSalle ;










  // const [state, dispatch] = useReducer(reducer, initialSalleState);

  // const [ salles, setSalles] = useState([]);
  
  // const [ id, setId] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  // const getDataSalle = async () => {
  //   const res = await axios.get('http://127.0.0.1:8000/salle-sport');
  //     setSalles(res.data);
  //     setIsLoading(false);
  // }

  // useEffect( () => {
  //   .then( res => {
  //     console.log('thedata',res.data.items);
  //     setSalles(res.data);
  //     setIsLoading(false);
  //     console.log('helllooo sallles', salles);
  //   })
  // },[]);




  // const listData = salles.map((salle) =>
  //   <option key={salle.id}> {salle.name}</option>
  // ) ;
  //const handleSubmit = e => {
  //  e.preventDefault()
  //}































// // import { Tab, Nav,Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
// // import { Link } from "react-router-dom";

// const url = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/rest-api`,
// });


// // export const getCiv = (body) => {
// //   let result = url
// //       .get('/clients')
// //       .then((response) => {
// //           console.log('the data', response.data);;
// //       })
// //       .catch((error) => {
// //           console.log(error);
// //       });

// //   return result;
// // };
// // getCiv();
// const AddSalle = () => {
//   const [salle, setSalle] = useState([]);

//   const [submitted, setSubmitted] = useState(false);
//   const initialClientState = {
//     name : "",
//     adresse : "",
//     phone : ""
//   };

//   const submitSalle = () => {
//     console.log('first');
//     let salleData = {
//       name: salle.name,
//       adresse: salle.adresse,
//       phone: salle.phone,
//     };
//     try {
//       const res = axios.post('http://localhost:8000/salle-sport/create').then((response) => {
//         setSalle({
//           name: salleData.salle.name,
//           adresse: salleData.salle.adresse,
//           phone: salleData.salle.phone,
//         });
//         console.log('second');
//         setSubmitted(true)
//         console.log(response.salleData);
//       })
//     } catch (error) {
//       console.log('il ya un probleme lors du post', error);
//     }
//     const newMenu = () => {
//       setSalle(initialClientState);
//       console.log('yeesss lha9');
//       setSubmitted(false);
//     };
//   }
//   return (
//     <>

//       <div className="">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="card-title">Salle de sport</h4>
//             </div>
//             <div className="card-body">
//               <div className="basic-form">
//                 <form onSubmit={submitSalle}>
//                   <div className="form-row">
//                     <div className="form-group col-md-6">
//                       <label>Nom</label>
//                       <input type="text" name="name" className="form-control" placeholder="Nom du client" />
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>Prénom</label>
//                       <input  type="text" name="adresse"  className="form-control"  placeholder="phone"/>
//                     </div>
//                     <div className="form-group col-md-6">
//                       <label>Email</label>
//                       <input  type="phone" name="phone"  className="form-control"  placeholder="phone"/>
//                     </div>

//                 </div>
//                   <button type="submit" className="btn btn-primary">
//                     Creer
//                   </button>
//                 </form>
//             </div>
//           </div>
//         </div>
//       </div>
        
//     </>
//   );
// };


// export default AddSalle;
