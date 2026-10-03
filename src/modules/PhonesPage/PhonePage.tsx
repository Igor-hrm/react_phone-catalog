import { Catalog } from '../../components/Catalog/Catalog';

import styles from './PhonePage.module.scss';

import { NavLink, useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { PhoneDetails } from '../../types';
import { getPhones } from '../../api/phones';

export const PhonePage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [phones, setphones] = useState<PhoneDetails[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'newest';
  const itensPerPage = Number(searchParams.get('itensPerPage')) || 16;

  useEffect(() => {
    setHasError(false);
    getPhones()
      .then(phone => {
        setphones(phone);
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
        <div className={styles.phones}>
          <section className={styles.phones__trail}>
            <NavLink to="/">
              <img src="/icons/Home.svg" alt="home" />
            </NavLink>

            <img src="/icons/ChevronArrowRight.svg" alt="home" />

            <p>Phones</p>
          </section>

          <section className={styles.phones__title}>
            <h1>Mobile phones</h1>
          </section>

          <section className={styles.phones__amount}>
            <p>{phones.length} models</p>
          </section>

          <section className={styles.phones__selector}>
            <div
              className={`${styles['phones__selector--container']} ${styles['phones__selector--sortBy']}`}
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
              className={`${styles['phones__selector--container']} ${styles['phones__selector--itensOnPage']}`}
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

          <Catalog type="phones" sortBy={sortBy} itensPerPage={itensPerPage} />
        </div>
      )}
    </>
  );
};
