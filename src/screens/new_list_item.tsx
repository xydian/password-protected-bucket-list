import React from 'react'
import { withStyles, Modal, EvaProp, Card, Text, Button } from '@ui-kitten/components'

interface Props {
  visible: boolean
  closeCallback: () => void
  eva?: EvaProp
}

function NewListItemModal(props: Props){
  return (
    <Modal
      visible={props.visible}
      backdropStyle={props.eva.style.backdrop}
      onBackdropPress={props.closeCallback}>
      <Card disabled={true}>
        <Text>Welcome to UI Kitten 😻</Text>
        <Button onPress={props.closeCallback}>
          DISMISS
        </Button>
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