import './App.css';
import Header from "./components/Header"
import ToDo from './components/ToDo';
import Footer from "./components/Footer"

function App() {
  return (
    <div className='App'>
      <div>
        <Header />
        <ToDo />
        <Footer />
      </div>
    </div>
  );
}

export default App;