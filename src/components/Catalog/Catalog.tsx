import styles from './Catalog.module.scss';

import { useEffect, useState } from 'react';
import { getAccessories } from '../../api/accessories';
import { getPhones } from '../../api/phones';
import { getTablets } from '../../api/tablets';
import { ProductDetails } from '../../types';
import { CatalogCard } from '../CatalogCard';
import { ProductCardSkeleton } from '../Loaders';
import { useSearchParams } from 'react-router-dom';

export type CatalogProps = {
  type: 'phones' | 'tablets' | 'accessories';
  sortBy: string;
  itensPerPage: number;
};

const getProducts = {
  phones: getPhones,
  tablets: getTablets,
  accessories: getAccessories,
};

export const Catalog = ({ sortBy, itensPerPage, type }: CatalogProps) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(products.length / itensPerPage);

  const start = (page - 1) * itensPerPage;
  const end = page * itensPerPage;

  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  const ordenation = () => {
    if (sortBy === 'newest') {
      return products.toReversed();
    } else if (sortBy === 'oldest') {
      return products;
    } else if (sortBy === 'price-low') {
      return products.toSorted((a, b) => a.priceDiscount - b.priceDiscount);
    } else if (sortBy === 'price-high') {
      return products.toSorted((a, b) => b.priceDiscount - a.priceDiscount);
    }

    return products.toReversed();
  };

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getProducts[type]()
      .then(product => {
        setProducts(product);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [type]);

  return (
    <div className={styles.catalog}>
      {hasError && <p>Error loading products</p>}

      {isLoading &&
        Array.from({ length: itensPerPage }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}

      {!isLoading &&
        !hasError &&
        ordenation()
          .slice(start, end)
          .map(product => (
            <CatalogCard showFullPrice key={product.id} product={product} />
          ))}

      <section className={styles.catalog__pagination}>
        <a
          className={`${styles['catalog__pagination--arrows']}`}
          onClick={() => {
            setSearchParams(prev => {
              const previousPage = Math.max(page - 1, 1);

              prev.set('page', String(previousPage));

              return prev;
            });
          }}
        >
          <img src="/icons/ChevronArrowLeft.svg" alt="previus page" />
        </a>
        <div className={`${styles['catalog__pagination--pages']}`}>
          {visiblePages.map(pageNumber => (
            <div
              key={pageNumber}
              className={
                page === pageNumber ? styles['catalog__pagination--active'] : ''
              }
              onClick={() => {
                setSearchParams(prev => {
                  prev.set('page', String(pageNumber));

                  return prev;
                });
              }}
            >
              <a>{pageNumber}</a>
            </div>
          ))}
        </div>
        <a
          className={`${styles['catalog__pagination--arrows']}`}
          onClick={() => {
            setSearchParams(prev => {
              const nextPage = Math.min(page + 1, totalPages);

              prev.set('page', String(nextPage));

              return prev;
            });
          }}
        >
          <img src="/icons/ChevronArrowRight.svg" alt="next page" />
        </a>
      </section>
    </div>
  );
};
