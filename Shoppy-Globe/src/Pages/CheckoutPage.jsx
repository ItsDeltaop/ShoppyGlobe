import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems, selectCartSubtotal } from '../Features/Cart/cartSlice';
import { formatPrice } from '../utils/format';
import { EmptyPanel } from '../Components/Common/StatusPanel';

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postal: '' });
  const [errors, setErrors] = useState({});
  if (!items.length) return <div className="page-container checkout-empty"><EmptyPanel title="Nothing to check out." message="Your bag is empty for now. Find a little something first." action="Explore the edit" /></div>;

  function update(event) { setForm((prev) => ({ ...prev, [event.target.name]: event.target.value })); }
  function placeOrder(event) {
    event.preventDefault();
    const nextErrors = {};
    Object.entries(form).forEach(([key, value]) => { if (!value.trim()) nextErrors[key] = 'Please fill in this field.'; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setMessage('Order placed — thank you for choosing thoughtfully.');
    dispatch(clearCart());
    window.setTimeout(() => navigate('/'), 2200);
  }

  return <div className="page-container checkout-page"><Link to="/cart" className="back-link"><ArrowLeft size={15} /> Back to your bag</Link><div className="page-heading checkout-title"><p className="eyebrow">THE FINAL LITTLE STEP</p><h1>Make it <em>yours.</em></h1><p>A demo checkout — no payment details needed.</p></div>
    {message && <div className="order-success" role="status"><CheckCircle2 size={22} /><div><strong>{message}</strong><p>Your bag is cleared. Taking you back to the home page…</p></div></div>}
    <div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder} noValidate><div className="form-section-title"><span>01</span><div><h2>Where should we send it?</h2><p>Your delivery details</p></div></div><div className="form-grid"><label className="field full-field">Full name<input name="name" value={form.name} onChange={update} placeholder="Alex Morgan" aria-invalid={!!errors.name} />{errors.name && <small>{errors.name}</small>}</label><label className="field full-field">Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="alex@example.com" aria-invalid={!!errors.email} />{errors.email && <small>{errors.email}</small>}</label><label className="field full-field">Street address<input name="address" value={form.address} onChange={update} placeholder="12 Garden Lane" aria-invalid={!!errors.address} />{errors.address && <small>{errors.address}</small>}</label><label className="field">City<input name="city" value={form.city} onChange={update} placeholder="Your city" aria-invalid={!!errors.city} />{errors.city && <small>{errors.city}</small>}</label><label className="field">Postal code<input name="postal" value={form.postal} onChange={update} placeholder="Postal code" aria-invalid={!!errors.postal} />{errors.postal && <small>{errors.postal}</small>}</label></div><p className="demo-disclaimer"><LockKeyhole size={15} /> Demo only. This form does not send or store your details.</p><button className="button button-dark place-order" type="submit">Place order · {formatPrice(subtotal)} <ArrowRight size={16} /></button></form>
    <aside className="checkout-recap"><p className="eyebrow">YOUR SELECTION</p><h2>A few good things.</h2>{items.map((item) => <div className="recap-item" key={item.id}><img src={item.thumbnail || item.images?.[0]} alt="" loading="lazy" /><div><strong>{item.title}</strong><span>Qty {item.quantity}</span></div><b>{formatPrice(item.price * item.quantity)}</b></div>)}<div className="summary-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{subtotal >= 75 ? 'Complimentary' : formatPrice(6.95)}</strong></div><div className="summary-total"><span>Demo total</span><strong>{formatPrice(subtotal + (subtotal >= 75 ? 0 : 6.95))}</strong></div><p className="tax-note">No payment is collected. This is a project demonstration.</p></aside></div>
  </div>;
}
