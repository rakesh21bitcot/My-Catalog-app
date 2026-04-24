import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogView from './components/CatalogView';
import ProductDetail from './components/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<CatalogView />} />
          <Route path="/item/:id" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
