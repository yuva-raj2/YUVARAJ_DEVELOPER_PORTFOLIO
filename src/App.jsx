import './App.css';
import Header from './Components/Header/Header.jsx';
import NeonCursor from './Components/Neon/NeonCursor.jsx';
import ParticleBackground from './Components/ParticleBackgrounds/ParticleBackground.jsx';
import TopContainer from './Components/TopContainer/TopContainer.jsx';
import ScrollToTop from './Components/ScrollToTopContainer/ScrollToTop.jsx';
function App() {
  return (
    <div className="app">
       <NeonCursor/>
      <ParticleBackground/>
      <Header />
      <TopContainer />
      <ScrollToTop /> 
    </div>
  );
}

export default App;
