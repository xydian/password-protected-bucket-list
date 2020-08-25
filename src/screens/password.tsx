import React from 'react'
import { Layout, withStyles, Text, Input, Button, EvaProp } from '@ui-kitten/components'
import { StatusBar } from 'react-native'
// @ts-ignore
import useAsyncStorage from '@rnhooks/async-storage'
import { asyncStorageKeys } from '../asyncStorageKeys'

interface Props {
  /**
   * function that will be called once the user is signed in, should update a flag
   */
  signInCallback: () => void

  eva?: EvaProp
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
    <Layout style={props.eva.style.root}>
      <Text>Bitte gebe dein Passwort ein</Text>
      <Input
        placeholder='Passwort'
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
        style={{
          marginTop: 20, 
          marginBottom: 20
        }}
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
  root: {
    marginTop: StatusBar.currentHeight, 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center'
  }
}))

export { StyledPasswordScreen as PasswordScreen }