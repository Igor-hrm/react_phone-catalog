import './App.scss';

import { Header, Footer } from './components';

import { HomePage, PhonePage } from './modules';

import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';

export const App = () => {
  return (
    <div className="App" id="top">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          {/* <Route path="/product/:productId" element={<ProductDetailsPage />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
