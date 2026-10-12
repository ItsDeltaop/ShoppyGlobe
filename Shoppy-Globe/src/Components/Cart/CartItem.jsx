import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from '../../Features/Cart/cartSlice';
import { formatPrice } from '../../utils/format';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return <article className="cart-item">
    <Link className="cart-item-image" to={`/product/${item.id}`}><img src={item.thumbnail || item.images?.[0]} alt={item.title} loading="lazy" /></Link>
    <div className="cart-item-info"><p className="product-category">{item.category}</p><Link to={`/product/${item.id}`} className="cart-item-title">{item.title}</Link><span className="cart-item-unit">{formatPrice(item.price)} each</span><div className="quantity-control"><button aria-label={`Decrease ${item.title} quantity`} disabled={item.quantity <= 1} onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.title} quantity`} onClick={() => dispatch(setQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus size={13} /></button></div></div>
    <div className="cart-item-end"><strong>{formatPrice(item.price * item.quantity)}</strong><button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={14} /> Remove</button></div>
  </article>;
}
