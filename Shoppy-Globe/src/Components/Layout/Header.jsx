import { ArrowUpRight, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../../Features/Cart/cartSlice';
import { selectSearch, setSearchQuery } from '../../Features/Search/searchSlice';

export default function Header() {
  const count = useSelector(selectCartCount);
  const { query } = useSelector(selectSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function submitSearch(event) {
    event.preventDefault();
    navigate('/');
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  }
  return <>
    <div className="announcement"><Sparkles size={13} /> GOOD THINGS, THOUGHTFULLY FOUND <span>— Complimentary shipping over 75$</span></div>
    <header className="site-header">
      <Link className="brand" to="/" aria-label="ShoppyGlobe home"><span className="brand-mark">s<span>.</span></span><span className="brand-name">shoppyglobe<small>STUDIO / OBJECTS FOR LIVING</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Discover</NavLink><a href="/#collection">Shop all</a><a href="/#story">Our point of view</a>
      </nav>
      <form className="header-search" onSubmit={submitSearch}><Search size={16} /><input aria-label="Search products" placeholder="Find your next favourite…" value={query} onChange={(e) => dispatch(setSearchQuery(e.target.value))} /><button aria-label="Submit search"><ArrowUpRight size={16} /></button></form>
      <Link className="cart-link" to="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={20} /><span>Bag</span><b>{count}</b></Link>
    </header>
  </>;
}
