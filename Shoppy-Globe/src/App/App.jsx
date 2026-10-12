import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';

export default function App() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content"><Outlet /></main>
      <Footer />
    </div>
  );
}
