import NavBar from "../components/navbar/index";
import Footer from "../components/footer/index";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


function Layout({ children }) {
  const scrollToTop=()=>{
    window.scrollTo(0, 0);
  }
  return (
    <main>
      <NavBar />
      {children}
      <div id="scrollToTop" onClick={scrollToTop}><FontAwesomeIcon icon={['fas','arrow-up']} className="" aria-hidden="true" />Top</div>
      <Footer />
    </main>
  );
}

export default Layout;
