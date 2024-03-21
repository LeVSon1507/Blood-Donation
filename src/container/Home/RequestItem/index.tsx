import React from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchRequest, formatDateTime } from 'src/utils';

function RequestItem({ data }: { data: SearchRequest }) {
   return (
      <div>
         <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
            rel='stylesheet'
         />
         <div className='container'>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='recent-activities card'>
                     <div className='card-close'>
                        <div className='dropdown'>
                           <button
                              type='button'
                              id='closeCard8'
                              data-toggle='dropdown'
                              aria-haspopup='true'
                              aria-expanded='false'
                              className='dropdown-toggle'
                           >
                              <i className='fa fa-ellipsis-v'></i>
                           </button>
                           <div
                              aria-labelledby='closeCard8'
                              className='dropdown-menu dropdown-menu-right has-shadow'
                           >
                              <a href='#/' className='dropdown-item remove'>
                                 {' '}
                                 <i className='fa fa-times'></i>Close
                              </a>
                              <a href='#/' className='dropdown-item edit'>
                                 {' '}
                                 <i className='fa fa-gear'></i>Edit
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className='card-header'>
                        <h3 className='h4'>Buổi hiến máu số {data?.requestid}</h3>
                     </div>
                     <div className='card-body no-padding'>
                        <div className='item'>
                           <div className='row'>
                              <div className='col-4 date-holder text-right'>
                                 <div className='icon'>
                                    <i className='fa fa-clock-o'></i>
                                 </div>
                                 <div className='date'>
                                    {' '}
                                    <span>6:00 am</span>
                                    <br />
                                    <span className='text-info'>6 hours ago</span>
                                 </div>
                              </div>
                              <div className='col-8 content'>
                                 <h5>{data?.hospitals?.nameHospital}</h5>
                                 <p>Địa chỉ: {data?.address}</p>
                                 <p>Thời gian hoạt động:: {data?.endtime}</p>
                                 <p>Thời gian hiến máu: {formatDateTime(data?.requestDate)}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
export default RequestItem;
