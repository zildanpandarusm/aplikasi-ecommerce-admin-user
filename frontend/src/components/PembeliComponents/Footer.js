import React from 'react';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31733.018015583148!2d106.8283109127914!3d-6.180619911693126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1690879386548!5m2!1sid!2sid"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="maps"
        ></iframe>
        <div className="kontak">
          <h2>Hubungi Kami</h2>
          <p>Alamat : Jl Kartini Jakarta</p>
          <p>Telepon : 082234574392</p>
          <p>Jam Kerja : 09.00 - 16.00</p>
        </div>
        <div className="medsos">
          <h2>Ikuti Kami</h2>
          <div className="medsosIcon">
            <FontAwesomeIcon className="icon" icon={faFacebook} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
            <FontAwesomeIcon className="icon" icon={faTwitter} />
            <FontAwesomeIcon className="icon" icon={faTiktok} />
            <FontAwesomeIcon className="icon" icon={faYoutube} />
          </div>
        </div>
      </div>
      <div className="bottom">
        <p>
          Copyright <FontAwesomeIcon className="icon" icon={faCopyright} />
          2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
