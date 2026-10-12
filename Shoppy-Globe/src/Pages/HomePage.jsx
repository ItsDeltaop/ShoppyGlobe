import { ArrowDown, ArrowUpRight, Leaf, PackageCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useProducts from '../Hooks/useProducts';
import ProductList from '../Components/Products/ProductList';
import LoadingScreen from '../Components/Common/LoadingScreen';
import { ErrorPanel } from '../Components/Common/StatusPanel';

export default function HomePage() {
  const { products, loading, error } = useProducts();
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> A MORE THOUGHTFUL KIND OF SHOPPING</p><h1>Find your<br />everyday <em>extra.</em></h1><p className="hero-description">Little upgrades. Lovely surprises. Things that make an ordinary Tuesday feel like something worth noticing.</p><div className="hero-actions"><a className="button button-dark" href="#collection">Explore the edit <ArrowDown size={16} /></a><Link className="text-link" to="/cart">Your shopping bag <ArrowUpRight size={15} /></Link></div><div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span></div><div><strong>Good taste, shared.</strong><small>Curated for curious people</small></div><span className="proof-star">✳</span></div></div>
      <div className="hero-art" aria-label="Editorial still life illustration">
        <div className="art-sticker sticker-top">THE EVERYDAY<br />EDIT <span>✳</span></div>
        <div className="art-circle"></div><div className="art-sun"></div>
        <div className="art-plant plant-one"><i></i><i></i><i></i><i></i><i></i></div>
        <div className="art-vase"><div className="vase-neck"></div><div className="vase-body"></div></div>
        <div className="art-book book-one"></div><div className="art-book book-two"></div>
        <div className="art-orb"></div><div className="art-label">OBJECTS<br />FOR LIVING</div>
        <div className="art-caption"><Sparkles size={14} /> Small things. Big feeling.</div>
      </div>
      <div className="hero-bottom"><span>01 / THE NEW EVERYDAY</span><span>SCROLL TO DISCOVER ↓</span><span>EST. WITH INTENTION</span></div>
    </section>
    <div className="promise-strip"><div><Leaf size={18} /><span>Thoughtful discoveries</span></div><div><PackageCheck size={18} /><span>Easy, fuss-free checkout</span></div><div><Sparkles size={18} /><span>Everyday, made interesting</span></div></div>
    {loading ? <LoadingScreen label="Finding the good stuff…" /> : error ? <div className="page-container"><ErrorPanel title="The shelves are taking a moment" message={error} onRetry={() => window.location.reload()} /></div> : <ProductList products={products} />}
    <section className="closing-note"><span className="closing-spark">✳</span><p>Good things don't need a special occasion.</p><h2>Make room for the <em>little lovely.</em></h2><a href="#collection" className="text-link">Back to the good finds <ArrowUpRight size={15} /></a></section>
  </>;
}
