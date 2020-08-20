import React from 'react'
import { Layout, withStyles, Text, Input, Button } from '@ui-kitten/components'
import { StatusBar, View } from 'react-native'
// @ts-ignore
import useAsyncStorage from '@rnhooks/async-storage'
import { asyncStorageKeys } from '../asyncStorageKeys'

interface Props {
  /**
   * function that will be called once the user is signed in, should update a flag
   */
  signInCallback: () => void
}

function PasswordScreen(props: Props){
  const [ storageItem, updateStorageItem, clearStorageItem ] = useAsyncStorage(asyncStorageKeys.password)
  const [value, setValue] = React.useState(__DEV__ ? 'Test1234' : '');

  const onPressSignIn = () => {
    if (storageItem == undefined){
      updateStorageItem(value)
      props.signInCallback()
    } else {
      if (value === storageItem){
        props.signInCallback()
      } else {
        alert('Falsches Passwort')
      }
    }
  }

  return (
    <Layout style={{
      marginTop: StatusBar.currentHeight, 
      flex: 1, 
      margin: 20, 
      // marginTop: 50, 
      justifyContent: 'center'
    }}>
      <Text>Bitte gebe dein Passwort ein</Text>
      <Input
        placeholder='Passwort'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
        style={{marginTop: 20, marginBottom: 20}}
        autoCompleteType='password'
        secureTextEntry
      />
      <Button 
        onPress={onPressSignIn}
        disabled={value === ''}
      >
        { storageItem != undefined ? 'Entsperren' : 'Neues Passwort festlegen' }
      </Button>
    </Layout>
  )
}

const StyledPasswordScreen = withStyles(PasswordScreen, theme => ({

}))

export { StyledPasswordScreen as PasswordScreen }