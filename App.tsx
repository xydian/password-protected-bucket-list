import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, TopNavigation, IconRegistry, ListItem } from '@ui-kitten/components';
import { BucketListScreen } from './src/screens/bucket_list';
import { NavigationBar } from './src/components/navigation_bar';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { asyncStorageKeys } from './src/asyncStorageKeys';
import { PasswordScreen } from './src/screens/password';
import { NewListItemModal } from './src/screens/new_list_item';
import { BucketListItem } from './src/BucketListItem';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';

export default function App() {
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
        listItem.performed = !listItem.performed
      } 
      newListItems.push(listItem)
    })

    setListItems(newListItems)
    AsyncStorage.setItem(asyncStorageKeys.listItems, JSON.stringify(newListItems))
  }

  const onPressListItem = (id: number) => {

  }

  const onPressAddListItem = async (title: string, conditions: string) => {
    const listItem: BucketListItem = {
      id: Math.random(), 
      title: title, 
      conditions: conditions, 
      performed: false,
    }

    const newListItems = [ listItem, ...listItems ]

    setListItems(newListItems)
    // updateStorageListItems(JSON.stringify(newListItems))
    await AsyncStorage.setItem(asyncStorageKeys.listItems, JSON.stringify(newListItems))
    console.log('new list items')
    console.log(JSON.stringify(newListItems))
    closeModal()
  } 

  const [ darkMode, setDarkMode ] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  useEffect(() => {
    setStatusBarStyle(darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={darkMode ? eva.dark : eva.light}>
        {!signedIn ? 
          <PasswordScreen signInCallback={signIn} />
          : 
          <Layout style={{flex: 1}}>
            <NavigationBar 
              signOutCallback={signOut} 
              onPressAdd={openModal} 
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <BucketListScreen 
              modalVisible={newListItemModal} 
              closeModal={closeModal} 
              listItems={listItems}
              onCheckListItem={onCheckListItem}
              onPressListItem={onPressListItem}
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
  );
}