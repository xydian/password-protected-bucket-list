import React, { useState, useEffect } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components'
import { BucketListScreen } from './src/screens/bucket_list'
import { NavigationBar } from './src/components/navigation_bar'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { asyncStorageKeys } from './src/asyncStorageKeys'
import { PasswordScreen } from './src/screens/password'
import { NewListItemModal } from './src/components/new_list_item_modal'
import { BucketListItem } from './src/BucketListItem'
import AsyncStorage from '@react-native-community/async-storage'
import { setStatusBarStyle } from 'expo-status-bar'
import { Provider, useSelector } from 'react-redux' 
import { store, RootState } from './src/redux/store'
import { AppState } from './src/redux/appReducer'
import { ToastAndroid } from 'react-native'
 
export default function AppProvider(){
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export function App() {
  const [ listItems, setListItems ] = useState<BucketListItem[]>([])

  const parseListItems = async () => {
    try {
      const storageListItems = await AsyncStorage.getItem(asyncStorageKeys.listItems)
      const listItemsOfStorage: BucketListItem[] = await JSON.parse(storageListItems)
      if (Array.isArray(listItemsOfStorage)){
        setListItems(listItemsOfStorage)
      } else {
        setListItems([])
      }
    } catch (e){
      alert(e)
    }  
  }  

  useEffect(() => {
    parseListItems()
  }, []) 

  const [ signedIn, setSignedIn ] = useState(false)
  const signIn = () => {
    setSignedIn(true)
  }
  const signOut = () => {
    setSignedIn(false)
  }

  const [ newListItemModal, setNewListItemModal ] = useState(false)
  const openModal = () => {
    setNewListItemModal(true)
  }
  const closeModal = () => {
    setNewListItemModal(false)
  }

  const onCheckListItem = (id: number) => {
    const newListItems: BucketListItem[] = []

    listItems.forEach(el => {
      const listItem: BucketListItem = { ...el } 
      if (el.id === id){
        listItem.completed = !listItem.completed
      } 
      newListItems.push(listItem)
    })

    setListItems(newListItems)
    AsyncStorage.setItem(asyncStorageKeys.listItems, JSON.stringify(newListItems))
  }

  const onDeleteListItem = (id: number) => {
    const newListItems: BucketListItem[] = []

    listItems.forEach(el => {
      const listItem: BucketListItem = { ...el } 
      if (el.id !== id){
        newListItems.push(listItem)
      } 
    })

    setListItems(newListItems)
    AsyncStorage.setItem(asyncStorageKeys.listItems, JSON.stringify(newListItems))

    ToastAndroid.show("Eintrag wurde gelöscht", ToastAndroid.LONG)
  }

  const onPressListItem = (id: number) => {}

  const onPressAddListItem = async (title: string, conditions: string) => {
    const listItem: BucketListItem = {
      id: Math.random(), 
      title: title, 
      conditions: conditions, 
      completed: false,
    }

    const newListItems = [ listItem, ...listItems ]

    setListItems(newListItems)
    await AsyncStorage.setItem(asyncStorageKeys.listItems, JSON.stringify(newListItems))
    closeModal()
  } 

  const appState: AppState = useSelector((state: RootState) => state)
  // change status bar style when dark mode is enabled/disabled
  useEffect(() => {
    setStatusBarStyle(!appState.darkMode ? 'dark' : 'light')
  }, [appState.darkMode])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={appState.darkMode ? eva.dark : eva.light}>
        {!signedIn ? 
          <PasswordScreen signInCallback={signIn} />
          : 
          <Layout style={{flex: 1}}>
            <NavigationBar 
              signOutCallback={signOut} 
              onPressAdd={openModal} 
            />
            <BucketListScreen 
              modalVisible={newListItemModal} 
              closeModal={closeModal} 
              listItems={listItems}
              onCheckListItem={onCheckListItem}
              onPressListItem={onPressListItem}
              onDeleteListItem={onDeleteListItem}
            />

            {/* modal to add new list item */}
            <NewListItemModal 
              visible={newListItemModal} 
              closeCallback={closeModal}
              onPressAddListItem={onPressAddListItem}
            />
          </Layout>
        }
      </ApplicationProvider>
    </>
  )
}