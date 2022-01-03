import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import transactionImg from "../../../../../images/profile/transactions.png";
import creneauImg from "../../../../../images/profile/creneau.png";
import abonnementImg from "../../../../../images/profile/abonnement.png";
import clientsImg from "../../../../../images/profile/clients.png";
import cochsImg from "../../../../../images/profile/coach.png";
import presencesImg from "../../../../../images/profile/presences.png";
import tresorieImg from "../../../../../images/profile/tresorie.png";
import salleImg from "../../../../../images/profile/salle.png";
import { Link } from "react-router-dom";

function SampleNextArrow(props) {
   const { onClick } = props;
   return (
      <div className="conteact-next c-pointer" onClick={onClick}>
         <i className="las la-long-arrow-alt-right" />
      </div>
   );
}

const Contacts = () => {
   const settings = {
      slidesToShow: 8,
      slidesToScroll: 1,
      dots: false,
      autoplay: false,
      // autoplaySpeed: 2000,
      centerMode: true,
      // infinite: true,
      // touchMove: true,
      className: "contacts-card",
      centerPadding: "60px",
      speed: 100,
      accessibility: false,
      nextArrow: <SampleNextArrow />,
      responsive: [
		
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 6,
               slidesToScroll: 1,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
            },
         },
		 {
            breakpoint: 360,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
            },
         },
      ],
   };
   return (
      <Slider {...settings}>
         <Link to="/transactions"> 
         <div className="items">
           <div >
               <img className="mb-3" src={transactionImg} alt />
               <h6 className="text-black mb-0">Transactions</h6>
               {/* <span className="fs-12">Gestion des transaction</span> */}
            </div>
         </div>
         </Link>
         <Link to="/Abonnements">
         <div className="items">
            <div>
               <img className="mb-3" src={abonnementImg} alt />
               <h6 className="text-black mb-0">Abonnements</h6>
               {/* <span className="fs-12">Gestion des abonnements</span> */}
            </div>
         </div>
         </Link>
         <Link to="/client">
         <div className="items">
            <div>
               <img className="mb-3" src={clientsImg} alt />
               <h6 className="text-black mb-0">Clients</h6>
               {/* <span className="fs-12">Gestion des clients</span> */}
            </div>
         </div>
         </Link>
         <Link to="/coach">
         <div className="items">
            <div>
               <img className="mb-3" src={cochsImg} alt />
               <h6 className="text-black mb-0">Coachs </h6>
               {/* <span className="fs-12">Gestion des coachs</span> */}
            </div>
         </div>
         </Link>
         <Link to="/presences">
         <div className="items">
            <div>
               <img className="mb-3" src={presencesImg} alt />
               <h6 className="text-black mb-0">Présences </h6>
               {/* <span className="fs-12">Gestion des présences</span> */}
            </div>
         </div>
         </Link>
          {/* <Link to="/tresorie">
          <div className="items">
            <div>
               <img className="mb-3" src={tresorieImg} alt />
               <h6 className="text-black mb-0">Trésorie</h6>
            </div>
         </div>
          </Link> */}
          <Link to="/creneaux">
          <div className="items">
            <div>
               <img className="mb-3" src={creneauImg} alt />
               <h6 className="text-black mb-0">Créneaux</h6>
               {/* <span className="fs-12">Gestion des Créneaux</span> */}
            </div>
         </div>
          </Link>
          <Link to="/salle">
          <div className="items">
            <div>
               <img className="mb-3" src={salleImg} alt />
               <h6 className="text-black mb-0">Salles d'activités</h6>
               {/* <span className="fs-12">Créer/Supprimer</span> */}
            </div>
         </div>
          </Link>
     </Slider>
   );
};

export default Contacts;
