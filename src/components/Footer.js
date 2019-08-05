import React from 'react';
import footerDecor from '../assets/img/footer-decor.png';
import {APP_ROUTES, DISCORD_LINK, STEAM_LINK} from '../config/Config';
import {Link} from 'react-router-dom';
import discordIcon from '../assets/img/discord-icon.png';
import steamIcon from '../assets/img/steam-icon.png';
import paypalImg from '../assets/img/paypal-payement.png';

function Footer({logo}){
   return(
       <footer>
           <img id="footer-decor" src={footerDecor} alt="Footer csgo cheat"/>

           <div id="footer-content" className="container">
               <div className="row justify-content-around">
                   <div className="col-md-3 col-sm-3 col-3">
                       <img id="logo" className="d-block" src={logo} alt="TakeUrBalls csgo cheat undetected since 2018"/>
                       <a target="_blank" rel="noopener noreferrer" className="icon" href={DISCORD_LINK}><img src={discordIcon} alt="Discord contact for support"/></a>
                       <a target="_blank" rel="noopener noreferrer" className="icon" href={STEAM_LINK}><img src={steamIcon} alt="Steam profile contact for support"/></a>
                   </div>

                   <div className="col-md-5 col-sm-5 col-5">
                       <ul style={{textAlign: 'start'}} className="ul-custom">
                           <li><Link to={APP_ROUTES['HOME']}>HOME</Link></li>
                           <li><Link to={APP_ROUTES['PRICES']}>PRICING</Link></li>
                       </ul>
                   </div>

                   <div className="col-md-3 col-sm-3 col-3">
                       <img className="d-block img-fluid w-50" src={paypalImg} alt="We are accepting Paypal"/>
                   </div>
               </div>


           </div>

       </footer>
   );
}

export default Footer;