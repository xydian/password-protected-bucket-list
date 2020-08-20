import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, TopNavigation, IconRegistry } from '@ui-kitten/components';
import { BucketListScreen } from './src/screens/bucket_list';
import { StatusBar, View } from 'react-native';
import { NavigationBar } from './src/components/navigation_bar';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// @ts-ignore
import useAsyncStorage from '@rnhooks/async-storage'
import { asyncStorageKeys } from './src/asyncStorageKeys';
import { PasswordScreen } from './src/screens/password';
import { NewListItemModal } from './src/screens/new_list_item';
import { BucketListItem } from './src/BucketListItem';

const LIST_ITEMS: BucketListItem[] = [
  {
    id: 1, 
    title: 'Visit Spain', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
    id: 2, 
    title: 'Visit Spain123', 
    conditions: 'Balearen zählen nicht', 
    performed: true 
  },
  {
    id: 3, 
    title: 'Visit Spain1234', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
    id: 4, 
    title: 'Visit Spain455', 
    conditions: 'Balearen zählen nicht', 
    performed: true 
  },
]

export default function App() {
  const [ 
    storageItem, 
    updateStorageItem, 
    clearStorageItem 
  ] = useAsyncStorage(asyncStorageKeys.password)
  
  const [ 
    storageListItems, 
    updateStorageListItems, 
    clearStorageListItems 
  ] = useAsyncStorage(asyncStorageKeys.listItems)

  const [ listItems, setListItems ] = useState<BucketListItem[]>([])

  const parseListItems = async () => {
    try {
      const listItemsOfStorage: BucketListItem[] = await JSON.parse(storageListItems)
      if (Array.isArray(listItemsOfStorage)){
        setListItems(listItemsOfStorage)
      } else {
        setListItems([])
      }
      console.log(listItemsOfStorage)
      console.log(storageListItems)   
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

  const onPressAddListItem = (title: string, conditions: string) => {
    const listItem: BucketListItem = {
      id: Math.random(), 
      title: title, 
      conditions: conditions, 
      performed: false,
    }

    const newListItems = [ listItem, ...listItems ]

    setListItems(newListItems)
    updateStorageListItems(JSON.stringify(newListItems))
    console.log('new list items')
    console.log(JSON.stringify(newListItems))
    closeModal()
  } 

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {!signedIn ? 
          <PasswordScreen signInCallback={signIn} />
          : 
          <>
            <NavigationBar signOutCallback={signOut} onPressAdd={openModal} />
            <BucketListScreen 
              modalVisible={newListItemModal} 
              closeModal={closeModal} 
              listItems={listItems}
            />

            {/* modal to add new list item */}
            <NewListItemModal 
              visible={newListItemModal} 
              closeCallback={closeModal}
              onPressAddListItem={onPressAddListItem}
            />
          </>
        }
      </ApplicationProvider>
    </>
  );
}