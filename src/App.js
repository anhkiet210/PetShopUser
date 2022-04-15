import './App.css';
import './css/base.css';
import './css/main.css';
import RootPage from './screens/rootPage'
import Header from './components/header/Header'
import Navigation from './components/Navigation'
import FeatureBox from './components/FeatureBox'
import Footer from './components/Footer'
import AddProduct from './components/AddProduct';

function App() {

  return (
    <div className="App">
      <Header />
      <Navigation />
      <RootPage />
      <FeatureBox />
      <Footer />
      {/* <AddProduct /> */}
    </div>
  );
}

export default App;
