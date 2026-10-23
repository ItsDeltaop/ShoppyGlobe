import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Features/Cart/cartSlice';
import { formatPrice, titleCase } from '../../Utilities/format';

export default function ProductItem({ product, index = 0 }) {
  const dispatch = useDispatch();
  const image = product.thumbnail || product.images?.[0];
  return <article className="product-card" style={{ '--card-delay': `${Math.min(index, 12) * 45}ms` }}>
    <Link className="product-image-wrap" to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
      <span className="product-tag">{index % 4 === 0 ? 'STUDIO PICK' : titleCase(product.category || 'Everyday')}</span>
      {image ? <img className="product-image" src={image} alt={product.title} loading="lazy" /> : <div className="image-fallback">SG.</div>}
      <span className="quick-view">View object <ArrowUpRight size={15} /></span>
    </Link>
    <div className="product-meta"><div><p className="product-category">{titleCase(product.category)}</p><Link to={`/product/${product.id ?? product._id}`} className="product-title">{product.title}</Link></div><span className="product-price">{formatPrice(product.price)}</span></div>
    <div className="product-card-bottom"><span className="rating">★ <b>{Number(product.rating || 4.6).toFixed(1)}</b> <i>·</i> Considered quality</span><button className="add-button" onClick={() => dispatch(addToCart(product))} aria-label={`Add ${product.title} to bag`}><Plus size={17} /> <span>Add to bag</span></button></div>
  </article>;
}