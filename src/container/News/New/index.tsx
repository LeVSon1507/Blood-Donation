import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewArticle, isEmpty } from 'src/utils';
import img from 'src/assets/images/undraw_blooming_re_2kc4.svg';

const Article = ({ data }: { data: NewArticle[] }) => {
   return (
      <div>
         <div className='container'>
            <div className='row justify-content-center'>
               <div className='col-12'>
                  <div className='section-title text-center mb-4 pb-2'>
                     <p className='text-muted para-desc mx-auto mb-0'>Tin Tức</p>
                  </div>
               </div>
            </div>

            <div className='row'>
               {isEmpty(data) ? (
                  <></>
               ) : (
                  data.map((item: NewArticle, index: number) => {
                     return (
                        <div key={index} className='col-lg-4 col-md-6 col-12 mt-4'>
                           <div className='card service-wrapper rounded border-0 h-[600px] shadow p-4'>
                              <img src={item?.image_url} alt='hinh_anh_news' />
                              <div className='content mt-4'>
                                 <h5 className='title'>{item?.title}</h5>
                                 <p className='text-muted mt-3 mb-0'>{item?.description}</p>
                                 <p className='text-muted mt-3 mb-0'>{item?.pubDate}</p>
                                 <p className='text-muted mt-3 mb-0'>
                                    Theo nguồn tin từ {item?.source_id}
                                 </p>
                                 <div className='mt-3'>
                                    <a href={item?.link} className='text-custom'>
                                       Read More <i className='mdi mdi-chevron-right'></i>
                                    </a>
                                 </div>
                              </div>
                              <div className='big-icon h1 text-custom'>
                                 <span className='uim-svg'>
                                    <img src={img} alt='1213' width={200} height={200} />
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
      </div>
   );
};

export default Article;
