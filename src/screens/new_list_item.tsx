import React, { useState } from 'react'
import { withStyles, Modal, EvaProp, Card, Text, Button, Input } from '@ui-kitten/components'
import { View } from 'react-native'

interface Props {
  visible: boolean
  closeCallback: () => void
  eva?: EvaProp

  onPressAddListItem: (title: string, conditions: string) => void
}

function NewListItemModal(props: Props){
  const [ title, setTitle ] = useState('')
  const [ conditions, setConditions ] = useState('')

  return (
    <Modal
      visible={props.visible}
      backdropStyle={props.eva.style.backdrop}
      onBackdropPress={props.closeCallback}
      style={{width: '90%'}}
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
          placeholder='Bedingungen'
          onChangeText={setConditions}
        />

        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-evenly',
          marginTop: 12, 
        }}>
          <Button 
            disabled={title === '' || conditions === ''}
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