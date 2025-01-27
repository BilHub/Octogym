import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import axios from 'axios';

// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
function refreshPage() {
  window.location.reload(false);
}
const capitalizeFirstLetter = (word) => {
  if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
  return '';
};
const RenewAbonnementModal = ({show, onShowShange, abonnementData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
  const [clientId, setClientId] = useState('')
  const [abonId, setAbontId] = useState('')
  const [type, setType] = useState('')
  const [typeName, setTypeName] = useState('')
  const [endDate,setEndDate] = useState('')
  const [presences,setPresences] = useState('')
  const [reste,setReste] = useState('')
  const [creneau,setCreneau] = useState('')
  const [showCreneau, setShowCreneau] = useState(false)
  const [selectedCreneau, setSeleCreneau] = useState([])
  
  
  const [abc, setAbc] = useState({})
  const abcDetailEND =`${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/${abonId}` 
  const abcRenewEND =`${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/renew/${abonId}` 
  const abcEditEND =`${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/${abonId}/` 
  const creneauClientEND = `${process.env.REACT_APP_API_URL}/rest-api/creneau/by-client?cl=${clientId}`
  let creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/rest-api/creneau/by-abonnement?ab=${type}`
const abonnementDeleteEND = `${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/deativate/${abonnementData['abonClientID']}`

  
  const [samedi, setSamedi] = useState([]);
  const [dimanche, setDimanche] = useState([]);
  const [lundi, setLundi] = useState([]);
  const [mardi, setMardi] = useState([]);
  const [mercredi, setMercredi] = useState([]);
  const [jeudi, setJeudi] = useState([]);
  const [vendredi, setVendredi] = useState([]);
  const [renouvler, setRenouvler] = useState(false)
  // 31 or 30 days?
  // if(month === 'January' | month === 'March' | month === 'May' | month === 'July' | month === 'August' | month === 'October' | month === 'December') {
  //   dayNum = 31;
  // } else if(month === 'April' | month === 'June' | month === 'September' | month === 'November') {
  //   dayNum = 30;
  // } else {
  // If month is February, calculate whether it is a leap year or not
  // var year = yearSelect.value;
  // var isLeap = new Date(year, 1, 29).getMonth() == 1;
  // isLeap ? dayNum = 29 : dayNum = 28;
  // }

  useEffect(() => {
    if (show == true) {
      setAbontId(abonnementData['abonClientID'])
      setClientId(abonnementData['clientId'])
      setType(abonnementData['abonClientType'])
      setEndDate(abonnementData['abonClientEnd'])
      setPresences(abonnementData['abonClientpresences'])
      setReste(abonnementData['abonClientReste'])
      setTypeName(abonnementData['abonClientTypeName'])
      // console.log('vdfbvfknb', abonId);
      setSeleCreneau(abonnementData['abonnementClientCreneaux'])
        axios.get(abcDetailEND).then(res => {
          setAbc(res.data)
          console.log('-------------------',abc)
        })
      }
    }, [show, renouvler]);
    let result1=[]
    let result2=[]
    let result3=[]
    let result4=[]
    let result5=[]
    let result6=[]
    let result7=[]
    useEffect(() => {
      // console.log('selected salle', typeof selectedSalle );
      if (type !== '' ) {
        axios.get(creneauPerAbonnementEND).then(res =>{
          res.data.forEach((req) => {
          if (req.day == "SA") {
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
              // setSeleCreneau([])
              setSamedi(result1)
              setDimanche(result2)
              setLundi(result3)
              setMardi(result4)
              setMercredi(result5)
              setJeudi(result6)
              setVendredi(result7)
            })
      }
    }, [type]);

const changingStyle = (crenId) => {
    if (selectedCreneau.indexOf(crenId) !== -1) {
   return true
  }
}

const handleSubmit = async () => {
  const abcData = {
    presence_quantity :presences,
    end_date : endDate,
    creneaux: selectedCreneau,
    reste : reste
  }
  await axios.patch(abcEditEND, abcData)
  // refreshPage()
  handleShow()
}
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl" onHide={handleShow} show={show}>
    <Modal.Header>
      <Modal.Title className='text-black font-weight-bold'>Detail abonnement</Modal.Title>
      <Button variant="" className="close" onClick={handleShow} > <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
    <div className="row">
              <div className="card-body bg-white ">
                <div className="media profile-bx">
                    <div className="media-body align-items-center">
                      <h2 className="text-black font-w600">
                        {capitalizeFirstLetter(abc.last_name)} {capitalizeFirstLetter(abc.first_name)}
                      </h2>
                      <h4 className="mb-2 text-black">ID client : <span className='text-danger'>{clientId}</span></h4>
                      <h6 className="text-black"> Presences Restantes <span className="text-primary">{abc.presence_quantity}</span>
                      </h6>
                      <h6 className='text-black'>Abonnement: <a className="item text-primary">{typeName} </a> </h6>
                      {/* <h6 className='text-primary'>Date d'éxpiration:&nbsp;&nbsp; <span className="badge badge-danger light">{endDate}</span> </h6> */}
                    <form >
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label className="text-black">Date d'expiration</label>
                          <input type="date" name="end_date"  value={endDate} className="form-control" onChange={e => setEndDate(e.target.value)}/>
                        </div>
                        <div className="form-group col-md-4">
                          <label className="text-black">séances restantes</label>
                          <input type="number" name="birth_date"value={presences} className="form-control" onChange={e => setPresences(e.target.value)}/>
                        </div>
                        <div className="form-group col-md-4">
                          <label className="text-black">Reste</label>
                          <input type="number" name="birth_date"value={reste} className="form-control" onChange={e => setReste(e.target.value)}/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* les creneaux */}
                <div className='col-12'>
            <Table responsive bordered className="verticle-middle">
              <tbody>
              { dimanche.length > 0 &&
                <tr>
                  <th style={{verticalAlign: "middle", width: "150px", border: ' 1px solid #000000'}}>
                        <h4 className='pl-2 text-dark font-weight-bold'>Dimanche</h4>
                  </th>
                  <td>
                    <div>
                    {dimanche.map(day=>   ( 
                      <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                        const creneauId = selectedCreneau.indexOf(day.id)
                        if (creneauId !== -1) {
                          const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                          setSeleCreneau(neawCren) 
                        } else{
                          setSeleCreneau([...selectedCreneau, day.id]) 
                        }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h6 style={{color: "#ffffff"}}  > {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h6> 
                          <p style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</p> 
                        </div>
                      </td> 
                    ))
                  }
                      </div>
                  </td>
                </tr>
                  }
              { lundi.length > 0 &&

              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Lundi</h4>
                </th>
                <td style={{ padding: '3px'}}>

                <div>
                { lundi.map(day=>   ( 
                    <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = selectedCreneau.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                        setSeleCreneau(neawCren) 
                      } else{
                        setSeleCreneau([...selectedCreneau, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>

                    
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
                  }

              { mardi.length > 0 && 

              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Mardi</h4>
                </th>
                <td>
                <div>
                { mardi.map(day=>   ( 
                      
                      <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                        const creneauId = selectedCreneau.indexOf(day.id)
                        if (creneauId !== -1) {
                          const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                          setSeleCreneau(neawCren) 
                        } else{
                          setSeleCreneau([...selectedCreneau, day.id]) 
                        }}}>
                          <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                            <h5 style={{color: "#ffffff"}}> {day.hour_start}
                            <span> - </span> 
                            {day.hour_finish}</h5> 
                            <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                          </div>
                        </td> 
                       ))}
                </div>
                </td>
              </tr>
                }

              { mercredi.length > 0 && 

              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Mercredi</h4>
                </th>
                <td>
                <div>
                {mercredi.map(day=>   ( 
                    
                    <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = selectedCreneau.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                        setSeleCreneau(neawCren) 
                      } else{
                        setSeleCreneau([...selectedCreneau, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}> {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                        </div>
                      </td> 
                     ))}
                </div>
                </td>
              </tr>
              }
              { jeudi.length > 0 && 

              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Jeudi</h4>
                </th>
                <td>
                <div>
                { jeudi.map(day=>   ( 
                     
                     <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = selectedCreneau.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                        setSeleCreneau(neawCren) 
                      } else{
                        setSeleCreneau([...selectedCreneau, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
               }
               { vendredi.length > 0 && 
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Vendredi</h4>
                </th>
                <td>
                <div>
                { vendredi.map(day=>   ( 
                    <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = selectedCreneau.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                        setSeleCreneau(neawCren) 
                      } else{
                        setSeleCreneau([...selectedCreneau, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
              }
              { samedi.length > 0 && 
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4 className='pl-2 text-dark font-weight-bold'>Samedi</h4>
                </th>
                <td>
                <div>
                { samedi.map(day=>   ( 
                   <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                    const creneauId = selectedCreneau.indexOf(day.id)
                    if (creneauId !== -1) {
                      const neawCren = selectedCreneau.filter(cren => cren !== day.id)
                      setSeleCreneau(neawCren) 
                    } else{
                      setSeleCreneau([...selectedCreneau, day.id]) 
                    }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}> {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity_name}</h6> 
                        </div>
                      </td> 
                     ))}
                </div>
                </td>
              </tr>
              }
              </tbody>
              </Table>
              </div>
                <div className="col-12">
                <Button onClick={handleShow} variant="danger light" className='m-2' > Fermer </Button>
                <Button onClick={handleSubmit} variant="primary" className='m-2' > Valider </Button>
                  <div onClick={async e => { 
                    await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/abonnement-client/renew/${abonId}` )
                    setRenouvler(true)
                    setTimeout(() => {
                      // refreshPage()
                      handleShow()
                    }, 100);
                  }}
                      role="button" className="btn btn-secondary popover-tes cursor-abonnement" >
                    Renouveler l'abonnement
                  </div>
                <Button 
                onClick={ async () => {
                  await axios.get(abonnementDeleteEND)
                  handleShow()
                  }}
                variant="danger" 
                className='m-2' > Supprimer </Button>
                </div>
              </div>

     </Modal.Body>
    </Modal>
)

}
export default RenewAbonnementModal;