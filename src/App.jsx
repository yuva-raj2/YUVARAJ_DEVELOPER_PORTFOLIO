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
       {/* primaryColor="#7c3aed"    // Your brand primary
        secondaryColor="#38f5d0"   // Your brand secondary
        particleCount={30}
        enableMagnetic={true}
        magneticSelector=".magnetic, .btn, a[href]"*/}
            <ParticleBackground />
        {/*primaryColor="#7c3aed"        // Your brand primary
        secondaryColor="#38f5d0"       // Your brand secondary
        density={12}                   // Fewer particles = better performance
        maxParticles={120}
        enableConnections={true}
        connectionDistance={100}
        enableMouseInteraction={true}
        blendMode="screen"
      />*/}
        <Header 
        brandName="Yuvitra Labs"
        primaryColor="#7c3aed"        // Your brand primary
        secondaryColor="#38f5d0"      // Your brand secondary
        sections={["Home", "Work", "Services", "About", "Contact"]}
        audioVolume={0.3}
        enableMagnetic={true}
        headerOffset={72}
      />
      <TopContainer />
      <ScrollToTop /> 
    </div>
  );
}

export default App;
