import { createContext, useEffect, useState, type ReactNode } from 'react';

export interface CartProviderProps {
  children: ReactNode;
}

export interface CartContextType {
  cartIds: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
}

// O Provider recebe tudo que estiver dentro dele através de:
export const CartContext = createContext<CartContextType | null>(null);
// cria o meu array do carrinho, e a função para alterar
// a função no useState é para descobrir o valor inicial quando criar o estado

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartIds, setCartIds] = useState<number[]>(() => {
    const savedCart = localStorage.getItem('cartIds');
    //json sempre devolve texto, o parse faz: string -> objeto/array

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // stringify objeto/array -> string
    localStorage.setItem('cartIds', JSON.stringify(cartIds));
  }, [cartIds]);

  const addToCart = (id: number) => {
    setCartIds(prev => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const removeFromCart = (id: number) => {
    setCartIds(prev => prev.filter(cartId => cartId !== id));
  };

  const isInCart = (id: number) => {
    return cartIds.includes(id);
  };

  return (
    <CartContext.Provider
      //Tudo que estiver dentro do FavoritesProvider pode acessar tudo isso:
      // const { cartIds, addToCart, removeFromCart, isInCart } = useCart();
      value={{
        cartIds,
        addToCart,
        removeFromCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
