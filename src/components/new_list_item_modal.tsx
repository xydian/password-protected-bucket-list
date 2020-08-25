import React, { useState } from 'react'
import { withStyles, Modal, EvaProp, Card, Text, Button, Input } from '@ui-kitten/components'
import { View } from 'react-native'
import { useKeyboard } from '@react-native-community/hooks'

interface Props {
  visible: boolean
  closeCallback: () => void
  eva?: EvaProp

  onPressAddListItem: (title: string, conditions: string) => void
}

function NewListItemModal(props: Props){
  const [ title, setTitle ] = useState('')
  const [ conditions, setConditions ] = useState('')

  // we use this to apply a bottom padding to modal when keyboard is open
  const keyboard = useKeyboard()

  return (
    <Modal
      visible={props.visible}
      backdropStyle={props.eva.style.backdrop}
      onBackdropPress={props.closeCallback}
      style={{width: '90%', paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0}}
    >
      <Card disabled={true}>
        <Text style={{marginBottom: 12}}>Neues Item hinzufügen</Text>

        <Input
          placeholder='Titel'
          onChangeText={setTitle}
        />

        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder='Bedingungen die erfüllt sein müssen um den Punkt abzuhaken'
          onChangeText={setConditions}
        />

        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-evenly',
          marginTop: 12, 
        }}>
          <Button 
            disabled={title === ''}
            onPress={() => props.onPressAddListItem(title, conditions)}
          >
            hinzufügen
          </Button>

          <Button 
            onPress={props.closeCallback} 
            status='basic'
          >
            abbrechen
          </Button>
        </View>

      </Card>
    </Modal>
  )
}

const StyledNewListItemModal = withStyles(NewListItemModal, theme => ({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}))

export { StyledNewListItemModal as NewListItemModal }