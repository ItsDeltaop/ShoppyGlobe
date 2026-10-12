import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../Components/Cart/CartItem';
import { EmptyPanel } from '../Components/Common/StatusPanel';
import { selectCartItems, selectCartSubtotal } from '../Features/Cart/cartSlice';
import { formatPrice } from '../Utilities/format';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 6.95;
  return <div className="page-container cart-page">
    <div className="page-heading"><p className="eyebrow">YOUR LITTLE COLLECTION</p><h1>Your bag<span className="heading-dot">.</span></h1><p>Good choices, all in one place.</p></div>
    {!items.length ? <EmptyPanel title="Your bag is taking a breather." message="It’s a good time to find something useful, beautiful, or delightfully unexpected." action="Explore the edit" /> :
      <div className="cart-layout"><section className="cart-list"><div className="cart-list-heading"><span><ShoppingBag size={17} /> YOUR OBJECTS ({items.reduce((s, i) => s + i.quantity, 0)})</span><Link to="/">Keep exploring <ArrowRight size={14} /></Link></div>{items.map((item) => <CartItem key={item.id} item={item} />)}<Link className="back-link cart-back" to="/"><ArrowLeft size={15} /> Back to the edit</Link></section>
      <aside className="order-summary"><p className="eyebrow">THE RECAP</p><h2>Just about<br />ready.</h2><div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</strong></div>{subtotal > 0 && subtotal < 75 && <p className="shipping-note">You’re {formatPrice(75 - subtotal)} away from complimentary shipping.</p>}<div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal + shipping)}</strong></div><p className="tax-note">Taxes, if applicable, are included in this demo total.</p><Link className="button button-dark checkout-button" to="/checkout">Continue to checkout <ArrowRight size={16} /></Link><p className="secure-note">♡ A thoughtful little purchase.</p></aside></div>}
  </div>;
}
