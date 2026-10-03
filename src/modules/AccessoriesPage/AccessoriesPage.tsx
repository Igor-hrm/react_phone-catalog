import styles from './AccessoriesPage.module.scss';

import { Catalog } from '../../components/Catalog/Catalog';

import { NavLink, useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { getAccessories } from '../../api/accessories';

import { ProductDetails } from '../../types';

export const AccessoriesPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const itensPerPage = Number(searchParams.get('itensPerPage')) || 16;

  useEffect(() => {
    setHasError(false);
    getAccessories()
      .then(accessorie => {
        setAccessories(accessorie);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <>
      {hasError ? (
        <p>Error ao carregar a página</p>
      ) : (
        <div className={styles.accessories}>
          <section className={styles.accessories__trail}>
            <NavLink to="/">
              <img src="/icons/Home.svg" alt="home" />
            </NavLink>

            <img src="/icons/ChevronArrowRight.svg" alt="home" />

            <p>Accessories</p>
          </section>

          <section className={styles.accessories__title}>
            <h1>Accessories</h1>
          </section>

          <section className={styles.accessories__amount}>
            <p>{accessories.length} models</p>
          </section>

          <section className={styles.accessories__selector}>
            <div
              className={`${styles['accessories__selector--container']} ${styles['accessories__selector--sortBy']}`}
            >
              <p>Sort By</p>
              <select
                value={sortBy}
                onChange={event => {
                  setSearchParams(prev => {
                    prev.set('sort', event.target.value);
                    prev.set('page', '1');

                    return prev;
                  });
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <img src="/icons/ChevronArrowDown.svg" />
            </div>

            <div
              className={`${styles['accessories__selector--container']} ${styles['accessories__selector--itensOnPage']}`}
            >
              <p>Itens on page</p>
              <select
                value={itensPerPage}
                onChange={event => {
                  setSearchParams(prev => {
                    prev.set('itensPerPage', event.target.value);
                    prev.set('page', '1');

                    return prev;
                  });
                }}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </select>
              <img src="/icons/ChevronArrowDown.svg" />
            </div>
          </section>

          <Catalog
            type="accessories"
            sortBy={sortBy}
            itensPerPage={itensPerPage}
          />
        </div>
      )}
    </>
  );
};
