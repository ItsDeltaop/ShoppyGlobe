import { Link } from 'react-router-dom';
import { AlertCircle, PackageSearch } from 'lucide-react';

export function ErrorPanel({ title = 'A little hiccup', message, onRetry }) {
  return <section className="status-panel"><span className="status-icon"><AlertCircle size={24} /></span><h2>{title}</h2><p>{message}</p>{onRetry && <button className="button button-dark" onClick={onRetry}>Try again</button>}</section>;
}
export function EmptyPanel({ title = 'Nothing here just yet', message, action = 'Explore the collection', to = '/' }) {
  return <section className="status-panel"><span className="status-icon"><PackageSearch size={24} /></span><h2>{title}</h2><p>{message}</p><Link className="button button-dark" to={to}>{action}</Link></section>;
}
