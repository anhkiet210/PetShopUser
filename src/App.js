import './App.css';
import './css/base.css';
import './css/main.css';
import './css/responsive.css'
import RootPage from './screens/rootPage'
import Header from './components/header/Header'
import Navigation from './components/Navigation'
import FeatureBox from './components/FeatureBox'
import Footer from './components/Footer'
import AddProduct from './components/AddProduct';
import ScrollToTop from './components/UI/ScrollToTop/Scroll';
import { useEffect, useState } from 'react';

function App() {

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleSCrollTop = () => {
      if (window.scrollY >= 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleSCrollTop)

    return () => window.removeEventListener("scroll", handleSCrollTop)

  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="App">
      <Header />
      <Navigation />
      <RootPage />
      {/* <FeatureBox /> */}
      <Footer />
      {showScrollTop && <ScrollToTop scrollTop={handleScrollToTop} />}
    </div>
  );
}

export default App;
