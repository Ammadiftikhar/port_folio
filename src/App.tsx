import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream text-ink dark:bg-ink dark:text-slate-200 selection:bg-grape/30">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Philosophy />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;

