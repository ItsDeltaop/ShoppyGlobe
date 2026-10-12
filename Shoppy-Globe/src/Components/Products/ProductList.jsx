import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setCategory, setSort } from '../../Features/Search/searchSlice';
import ProductItem from './ProductItem';
import { EmptyPanel } from '../Common/StatusPanel';
import { titleCase } from '../../utils/format';

export default function ProductList({ products }) {
  const dispatch = useDispatch();
  const { query, category, sort } = useSelector(selectSearch);
  const categories = useMemo(() => ['all', ...new Set(products.map((p) => p.category).filter(Boolean))], [products]);
  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = products.filter((p) => (category === 'all' || p.category === category) && (!q || `${p.title} ${p.description} ${p.category} ${p.brand || ''}`.toLowerCase().includes(q)));
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return result;
  }, [products, query, category, sort]);

  return <section className="collection-section" id="collection">
    <div className="collection-heading"><div><p className="eyebrow">THE GOOD FINDS EDIT</p><h2>Objects with <em>a little</em><br className="desktop-break" /> something extra.</h2></div><p className="collection-aside">Useful, beautiful, and just a bit unexpected.<br />The everyday deserves better.</p></div>
    <div className="filter-bar"><div className="category-pills" aria-label="Filter by category"><span className="filter-label">FILTER</span>{categories.slice(0, 7).map((item) => <button key={item} onClick={() => dispatch(setCategory(item))} className={`filter-pill ${category === item ? 'active' : ''}`}>{item === 'all' ? 'Everything' : titleCase(item)}</button>)}</div><label className="sort-control">SORT BY <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}><option value="featured">Curated</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
    <div className="results-line"><span>{visibleProducts.length} objects to explore</span>{query && <span>Matching “{query}”</span>}</div>
    {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <ProductItem key={product.id} product={product} index={index} />)}</div> : <EmptyPanel title="No matches, yet." message="Try another search or loosen your filters. Your next favourite might be one word away." action="Reset filters" to="/" />}
  </section>;
}
