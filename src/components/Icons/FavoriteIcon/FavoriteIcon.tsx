export * from './FavoriteIcon';

import { NavLink } from 'react-router-dom';

import styles from '../icons.module.scss';

interface FavoriteIconProps {
  className?: string;
  favorites?: number;
}
export const FavoriteIcon = ({
  className,
  favorites = 0,
}: FavoriteIconProps) => {
  return (
    <NavLink
      to="/favorites"
      className={`${styles.iconButton} ${className ?? ''}`}
    >
      <img src="/icons/Favourites_HeartLike.svg" alt="Favoritos" />

      {favorites > 0 && (
        <span className={styles.iconButton__value}>{favorites}</span>
      )}
    </NavLink>
  );
};
