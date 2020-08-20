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

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export default function App() {
  const [ storageItem, updateStorageItem, clearStorageItem ] = useAsyncStorage(asyncStorageKeys.password)
  
  // const [ password, setPassword ] = useState(storageItem == undefined ? '' : storageItem)
  const [ signedIn, setSignedIn ] = useState(false)
  const signIn = () => {
    setSignedIn(true)
  }
  const signOut = () => {
    setSignedIn(false)
  }

  useEffect(() => {

  }, [])

  const [ newListItemModal, setNewListItemModal ] = useState(false)
  const openModal = () => {
    setNewListItemModal(true)
  }

  const closeModal = () => {
    setNewListItemModal(false)
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
            <BucketListScreen modalVisible={newListItemModal} closeModal={closeModal} />

            {/* modal to add new list item */}
            <NewListItemModal 
              visible={newListItemModal} 
              closeCallback={closeModal}
            />
          </>
        }
      </ApplicationProvider>
    </>
  );
}