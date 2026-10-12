import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Features/Cart/cartSlice';
import { fetchProductById } from '../services/productsApi';
import { formatPrice, titleCase } from '../utils/format';
import LoadingScreen from '../Components/Common/LoadingScreen';
import { ErrorPanel } from '../Components/Common/StatusPanel';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantityLocal] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(''); setProduct(null); setQuantityLocal(1);
    fetchProductById(id, controller.signal).then(setProduct).catch((err) => {
      if (err.name !== 'AbortError') setError(err.message || 'Unable to load this product.');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  if (loading) return <LoadingScreen label="Getting to know this object…" />;
  if (error) return <div className="page-container"><ErrorPanel title="We couldn't find that object" message={error} /></div>;
  if (!product || !product.id) return <div className="page-container"><ErrorPanel title="Object not found" message={`No product exists at route /product/${id}.`} /></div>;

  function addProduct() {
    for (let i = 0; i < quantity; i += 1) dispatch(addToCart(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }
  const image = product.images?.[0] || product.thumbnail;
  return <div className="detail-page page-container">
    <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to the edit</Link>
    <div className="detail-layout"><div className="detail-image"><span className="detail-image-tag">A CLOSER LOOK / {String(product.id).padStart(2, '0')}</span><img src={image} alt={product.title} /></div>
      <div className="detail-copy"><p className="eyebrow">THE GOOD FINDS EDIT / {titleCase(product.category)}</p><p className="detail-category">{product.brand || 'SHoppyGlobe Studio'}</p><h1>{product.title}</h1><div className="detail-rating"><span>★ {Number(product.rating || 0).toFixed(1)}</span><span>·</span><span>{product.stock > 0 ? 'Ready to make it yours' : 'Check availability'}</span></div><p className="detail-price">{formatPrice(product.price)}</p><p className="detail-description">{product.description}</p><div className="detail-rule"></div><div className="detail-quantity"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantityLocal((q) => Math.max(1, q - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantityLocal((q) => q + 1)}><Plus size={14} /></button></div></div><button className="button button-dark detail-add" onClick={addProduct}>{added ? <><Check size={17} /> Added to your bag</> : <>Add to bag · {formatPrice(product.price * quantity)} <ArrowUpRight size={16} /></>}</button><div className="detail-perks"><div><Truck size={18} /><span><strong>Easy delivery</strong><small>Shipping details at checkout</small></span></div><div><ShieldCheck size={18} /><span><strong>Considered choice</strong><small>Selected for everyday use</small></span></div></div><p className="detail-footnote">Product information is provided by our demo catalogue and may vary.</p></div></div>
  </div>;
}
