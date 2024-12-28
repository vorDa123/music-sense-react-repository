import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";

export default function Footer() {
  return (
    <footer>
      <div className="footerContent wrapper">
        <div className="contactInfo">
          <h2>Contact</h2>
          <p>Davor Kuharić</p>
          <p>dkuharic@tvz.hr</p>
          <p>Vrbik 8, Zagreb, Croatia</p>
        </div>
        <img src={MusicSenseLogo} alt="logo" />
        <div className="sitemapInfo">
          <h2>Sitemap</h2>
          <p>Home</p>
          <p>My profile</p>
          <p>My playlists</p>
          <p>My favorites</p>
        </div>
      </div>
      <div className="copyright wrapper">
        Copyright &#169; 2024. All rights reserved.
      </div>
    </footer>
  );
}
