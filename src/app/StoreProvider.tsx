'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore, AppStore } from '../lib/redux/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  
  return <Provider store={storeRef.current}>
    <PersistGate loading={<>Loading...</>} persistor={storeRef.current.__persistor}>
      {children}
    </PersistGate>
  </Provider>
}