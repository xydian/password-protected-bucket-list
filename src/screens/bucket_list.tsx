import React, { useState } from 'react'
import { View } from 'react-native'
import { withStyles, Layout, ListItem, List, EvaProp, Divider, CheckBox, StyleType, Toggle } from '@ui-kitten/components'
import { NewListItemModal } from './new_list_item';
import { NavigationBar } from '../components/navigation_bar';
import { BucketListItem } from '../BucketListItem';

interface Props {
  modalVisible: boolean
  closeModal: () => void

  listItems: BucketListItem[]

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

  const onCheckBoxCheckedChange = (id: number) => {

  }

  const renderAccessory = (props: any, item: BucketListItem) => (
    <CheckBox
      {...props}
      checked={item.performed}
      onChange={() => onCheckBoxCheckedChange(item.id)}
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