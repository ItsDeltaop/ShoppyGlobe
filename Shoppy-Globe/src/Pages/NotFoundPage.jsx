import { ArrowLeft, Compass, SearchX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();
  return <div className="not-found page-container"><div className="not-found-art"><span>4</span><Compass size={72} strokeWidth={1} /><span>4</span></div><p className="eyebrow"><SearchX size={14} /> LOST IN THE AISLES</p><h1>This page took<br /><em>the scenic route.</em></h1><p className="not-found-detail">Error 404 · Route not found<br /><code>{location.pathname}</code> doesn’t lead to a page in ShoppyGlobe Studio. It may have moved, or the address might be mistyped.</p><Link className="button button-dark" to="/"><ArrowLeft size={16} /> Return to the good finds</Link></div>;
}
