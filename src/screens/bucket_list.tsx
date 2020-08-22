import React, { useState } from 'react'
import { View } from 'react-native'
import { withStyles, Layout, ListItem, List, EvaProp, Divider, CheckBox, Toggle } from '@ui-kitten/components'
import { BucketListItem } from '../BucketListItem';

interface Props {
  modalVisible: boolean
  closeModal: () => void

  listItems: BucketListItem[]
  onCheckListItem: (id: number) => void
  onPressListItem: (id: number) => void

  eva?: EvaProp
}

function BucketListScreen(props: Props){
  const renderItem = ({ item, index }: { item: BucketListItem, index: number }) => (
    <ListItem
      title={item.title}
      description={item.conditions}
      accessoryRight={(props) => renderAccessory(props, item)}
    />
  )

  const renderAccessory = (accessoryProps: any, item: BucketListItem) => (
    <CheckBox
      {...accessoryProps}
      checked={item.performed}
      onChange={() => props.onCheckListItem(item.id)}
    /> 
  )

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
  }

  return (
    <Layout level='2'>
      <View style={{
        alignItems: 'flex-start',
        margin: 14, 
      }}>
        <Toggle checked={checked} onChange={onCheckedChange}>
          Ausgeführte anzeigen
        </Toggle>
      </View>

      <List
        style={props.eva.style.container} 
        data={props.listItems}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  )
}

const StyledBucketListScreen = withStyles(BucketListScreen, theme => ({
  container: {

  }
}))

export { StyledBucketListScreen as BucketListScreen }