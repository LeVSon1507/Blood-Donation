import React from 'react';
import './standard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Standard() {
   return (
      <div>
         <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
            rel='stylesheet'
         />

         <section className='section services-section' id='services'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-6'>
                     <div className='section-title'>
                        <h2>Tiêu chuẩn tham gia hiến máu</h2>
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-desktop'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>Cân nặng: Nam ≥ 45 kg Nữ ≥ 45 kg</h5>
                        </div>
                     </div>
                  </div>

                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-user'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>Mang theo chứng minh nhân dân/hộ chiếu</h5>
                        </div>
                     </div>
                  </div>

                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-comment'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>
                              Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô
                              hấp, dạ dày…
                           </h5>
                        </div>
                     </div>
                  </div>

                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-image'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>
                              Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, không nhiễm
                              viêm gan B,...
                           </h5>
                        </div>
                     </div>
                  </div>

                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-th'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>
                              Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên).
                           </h5>
                        </div>
                     </div>
                  </div>

                  <div className='col-sm-6 col-lg-4'>
                     <div className='feature-box-1'>
                        <div className='icon'>
                           <i className='fa fa-cog'></i>
                        </div>
                        <div className='feature-content'>
                           <h5>Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B</h5>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
export default Standard;
