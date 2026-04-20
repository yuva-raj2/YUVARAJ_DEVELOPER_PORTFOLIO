import './App.css';
import Header from './Components/Header/Header.jsx';
import NeonCursor from './Components/Neon/NeonCursor.jsx';
import ParticleBackground from './Components/ParticleBackgrounds/ParticleBackground.jsx';
import TopContainer from './Components/TopContainer/TopContainer.jsx';
import ScrollToTop from './Components/ScrollToTopContainer/ScrollToTop.jsx';
import FloatingWhatsApp from './Components/FloatingWhatsApp/FloatingWhatsApp.jsx';
function App() {
  return (
    <div className="app">
      <NeonCursor 
  primaryColor="#38f5d0"    // Your cyan brand color
  secondaryColor="#7c3aed"  // Your purple brand color  
  particleCount={20}        // Fewer particles = better performance
  enableMagnetic={true}     // Magnetic effect on buttons
  magneticSelector=".magnetic, .btn, a[href], button" // Elements to attract
/>
      <ParticleBackground 
  primaryColor="#38f5d0"        // Your cyan brand color
  secondaryColor="#7c3aed"      // Your purple brand color
  density={12}                  // Fewer particles = better performance
  maxParticles={120}            // Absolute cap
  enableConnections={true}      // Subtle lines between particles
  connectionDistance={100}      // Max distance for connections
  enableMouseInteraction={true} // Particles gently avoid cursor
  blendMode="screen"            // Blends beautifully with dark bg
/>
      
     <Header 
  brandName="Yuvitra Labs"
  logoHref="Home"  // ✅ No # needed now
  sections={["Home", "Services","Skills", "Work", "Process", "About", "FAQ", "Contact"]}
  primaryColor="#38f5d0"
  secondaryColor="#7c3aed"
  audioVolume={0.3}
  enableMagnetic={true}
  headerOffset={72}
  whatsappNumber="918667851286"  // ✅ ADD YOUR NUMBER HERE!
/>
      
      <TopContainer /> {/* ✅ Update this component with new hero content (see below) */}
      
      {/* ✅ NEW SECTIONS - Add these components */}
      {/* <TrustSignals /> */}
      {/* <ProcessSection /> */}
      {/* <FAQSection /> */}
      
      <ScrollToTop /> 
      <FloatingWhatsApp phoneNumber="918667851286" /> {/* ✅ REPLACE WITH YOUR NUMBER */}
    </div>
  );
}

export default App;