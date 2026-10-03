import { Catalog } from '../../components/Catalog/Catalog';

import styles from './TabletsPage.module.scss';

import { NavLink, useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { TabletDetails } from '../../types';
import { getTablets } from '../../api/tablets';

export const TabletsPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [phones, setphones] = useState<TabletDetails[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const itensPerPage = Number(searchParams.get('itensPerPage')) || 16;

  useEffect(() => {
    setHasError(false);
    getTablets()
      .then(tablet => {
        setphones(tablet);
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
        <div className={styles.tablets}>
          <section className={styles.tablets__trail}>
            <NavLink to="/">
              <img src="/icons/Home.svg" alt="home" />
            </NavLink>

            <img src="/icons/ChevronArrowRight.svg" alt="home" />

            <p>Tablets</p>
          </section>

          <section className={styles.tablets__title}>
            <h1>Tablets</h1>
          </section>

          <section className={styles.tablets__amount}>
            <p>{phones.length} models</p>
          </section>

          <section className={styles.tablets__selector}>
            <div
              className={`${styles['tablets__selector--container']} ${styles['tablets__selector--sortBy']}`}
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
              className={`${styles['tablets__selector--container']} ${styles['tablets__selector--itensOnPage']}`}
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

          <Catalog type="tablets" sortBy={sortBy} itensPerPage={itensPerPage} />
        </div>
      )}
    </>
  );
};
