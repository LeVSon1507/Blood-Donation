import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Note() {
   return (
      <div>
         <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
            integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
         />
         <div className='container'>
            <div className='row'>
               <div className='col-md-6 col-lg-4'>
                  <div className='card bg-primary card-hover mb-9'>
                     <div className='card-body text-center px-md-5 px-lg-6 my-2'>
                        <div className='card-icon-border-large border-primary mtn-80'>
                           <i className='fa fa-quote-left text-primary' aria-hidden='true'></i>
                        </div>
                        <blockquote className='blockquote blockquote-sm mt-2'>
                           <p className='font-normal mb-5'>
                              Không nên: <br /> - Uống sữa, rượu bia trước khi hiến máu.
                              <br /> - Lái xe đi xa, khuân vác, làm việc nặng hoặc luyện tập thể
                              thao gắng sức trong ngày lấy máu..
                           </p>
                           <footer className='blockquote-footer text-uppercase text-white'>
                              <cite
                                 className='d-block text-capitalize font-size-14 opacity-80 mt-1'
                                 title='Source Title'
                              >
                                 BS - Nguyễn Văn A
                              </cite>
                           </footer>
                        </blockquote>
                     </div>
                  </div>
               </div>

               <div className='col-md-6 col-lg-4'>
                  <div className='card bg-success card-hover mb-9'>
                     <div className='card-body text-center px-md-5 px-lg-6 my-2'>
                        <div className='card-icon-border-large border-success mtn-80'>
                           <i className='fa fa-quote-left text-success' aria-hidden='true'></i>
                        </div>
                        <blockquote className='blockquote blockquote-sm mt-2'>
                           <p className='font-normal mb-5'>
                              - Ăn nhẹ và uống nhiều nước (300-500ml) trước khi hiến máu. <br /> -
                              Đè chặt miếng bông gòn cầm máu nơi kim chích 10 phút, giữ băng keo cá
                              nhân trong 4-6 giờ. <br /> - Nằm và ngồi nghỉ tại chỗ 10 phút sau khi
                              hiến máu. <br /> - Nằm nghỉ đầu thấp, kê chân cao nếu thấy chóng mặt,
                              mệt, buồn nôn. <br /> - Chườm lạnh (túi chườm chuyên dụng hoặc cho đá
                              vào khăn) chườm vết chích nếu bị sưng, bầm tím.
                           </p>
                           <footer className='blockquote-footer text-uppercase text-white'>
                              <cite
                                 className='d-block text-capitalize font-size-14 opacity-80 mt-1'
                                 title='Source Title'
                              >
                                 Y tá - Nguyễn Văn B
                              </cite>
                           </footer>
                        </blockquote>
                     </div>
                  </div>
               </div>

               <div className='col-md-6 col-lg-4'>
                  <div className='card bg-pink card-hover mb-9'>
                     <div className='card-body text-center px-md-5 px-lg-6 my-2'>
                        <div className='card-icon-border-large border-pink mtn-80'>
                           <i className='fa fa-quote-left text-pink' aria-hidden='true'></i>
                        </div>
                        <blockquote className='blockquote blockquote-sm mt-2'>
                           <p className='font-normal mb-5'>
                              Nếu phát hiện chảy máu tại chỗ chích: <br /> - Giơ tay cao.
                              <br /> - Lấy tay kia ấn nhẹ vào miếng bông hoặc băng dính.
                              <br /> - Liên hệ nhân viên y tế để được hỗ trợ khi cần thiết.
                           </p>
                           <footer className='blockquote-footer text-uppercase text-white'>
                              <cite
                                 className='d-block text-capitalize font-size-14 opacity-80 mt-1'
                                 title='Source Title'
                              >
                                 Bs. PGS Lê Văn Sơn
                              </cite>
                           </footer>
                        </blockquote>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
export default Note;
