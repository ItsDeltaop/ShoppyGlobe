import { ArrowUpRight, Instagram, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer" id="story">
    <div className="footer-top"><div><Link className="brand footer-brand" to="/"><span className="brand-mark">s<span>.</span></span><span className="brand-name">shoppyglobe<small>STUDIO / OBJECTS FOR LIVING</small></span></Link><p>Less noise. Better finds.<br />A little more intention in the everyday.</p></div><div className="footer-note"><Sparkles size={18} /><span>Curiosity looks good on you.</span></div></div>
    <div className="footer-bottom"><span>© 2026 ShoppyGlobe Studio · A demo storefront</span><span>Made for the everyday, not the algorithm.</span><a href="https://dummyjson.com/products" target="_blank" rel="noreferrer">Product data <ArrowUpRight size={12} /></a></div>
  </footer>;
}
