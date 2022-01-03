import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import data from "./tableData.js";





const SimpleDataTable = () => {
   const [clientData, setclientData] = useState([]);
   
      useEffect(() => {
         const fetchClient =  async () => {
            try {
               const result = await axios.get(`${process.env.REACT_APP_API_URL}/rest-api/clients/`)

               console.log('cest le resultat data',result.data);
               setclientData(result.data)
            } catch (error) {
               alert(error);
               console.log(error);
            }
         }
         fetchClient();
      }, []);
   
   return (
      <div className="col-12">
         <div className="card">
            <div className="card-header">
               <h4 className="card-title">Datatable</h4>
            </div>
            <div className="card-body">
               <Table responsive className="w-100">
                  <div id="example_wrapper" className="dataTables_wrapper">
                     <table
                        id="example"
                        className="display w-100 dataTable"
                        role="grid"
                        aria-describedby="example_info"
                     >
                        <thead>
                           {data.jobsTable.columns.map((d, i) => (
                              <th key={i}>{d}</th>
                           ))}
                        </thead>
                        <tbody>
                     {clientData.map(client => (
                        <tr role="row" key={client.id}>
                           <th >{client.last_name}</th>
                           <th >{client.first_name}</th>
                           <th >{client.phone}</th>
                           <th >{client.email}</th>
                           <th >{client.blood}</th>
                           <th >{client.first_name}</th>
                           <th >{client.first_name}</th>
                        </tr>
                        ))}
                        </tbody>
                        <tfoot>
                           <tr role="row">
                              {data.jobsTable.columns.map((d, i) => (
                                 <th key={i}>{d}</th>
                              ))}
                           </tr>
                        </tfoot>
                     </table>
                  </div>
               </Table>
            </div>
         </div>
      </div>
   );
};

export default SimpleDataTable;
