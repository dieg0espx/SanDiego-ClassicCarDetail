'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOCATION: 'SET_LOCATION',
  SET_CUSTOMER_INFO: 'SET_CUSTOMER_INFO',
  UPDATE_TOTAL: 'UPDATE_TOTAL'
}

// Initial state
const initialState = {
  items: [],
  location: null,
  customerInfo: null,
  total: 0
}

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        location: null,
        customerInfo: null,
        total: 0
      }

    case CART_ACTIONS.SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }

    case CART_ACTIONS.SET_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: action.payload
      }

    case CART_ACTIONS.UPDATE_TOTAL:
      return {
        ...state,
        total: action.payload
      }

    default:
      return state
  }
}

// Calculate total
function calculateTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Calculate total whenever items change
  useEffect(() => {
    const total = calculateTotal(state.items)
    if (total !== state.total) {
      dispatch({ type: 'UPDATE_TOTAL', payload: total })
    }
  }, [state.items, state.total])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (parsedCart.items) {
          parsedCart.items.forEach(item => {
            dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item })
          })
        }
        if (parsedCart.location) {
          dispatch({ type: CART_ACTIONS.SET_LOCATION, payload: parsedCart.location })
        }
        if (parsedCart.customerInfo) {
          dispatch({ type: CART_ACTIONS.SET_CUSTOMER_INFO, payload: parsedCart.customerInfo })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item })
  }

  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId })
  }

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const setLocation = (location) => {
    dispatch({ type: CART_ACTIONS.SET_LOCATION, payload: location })
  }

  const setCustomerInfo = (customerInfo) => {
    dispatch({ type: CART_ACTIONS.SET_CUSTOMER_INFO, payload: customerInfo })
  }

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setLocation,
    setCustomerInfo,
    getItemCount,
    total: calculateTotal(state.items)
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
