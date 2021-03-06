import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { withStyles, Layout, ListItem, List, EvaProp, Divider, CheckBox, Toggle } from '@ui-kitten/components'
import { BucketListItem } from '../BucketListItem'

interface Props {
  modalVisible: boolean
  closeModal: () => void

  listItems: BucketListItem[]
  onCheckListItem: (id: number) => void
  onPressListItem: (id: number) => void
  onDeleteListItem: (id: number) => void

  eva?: EvaProp
}

function BucketListScreen(props: Props){
  const renderItem = ({ item, index }: { item: BucketListItem, index: number }) => (
    <ListItem
      title={item.title}
      description={item.conditions}
      accessoryRight={(props) => renderAccessory(props, item)}
      key={item.id}
      onLongPress={() => props.onDeleteListItem(item.id)}
    />
  )

  const renderListItems = () => {
    const renderedItems: any[] = []

    props.listItems.forEach((el, i) => {
      if (el.completed && !showExecuted){
        return 
      }
      renderedItems.push(renderItem({ item: el, index: i}))
      renderedItems.push(<Divider />)
    })

    return renderedItems
  }

  const renderAccessory = (accessoryProps: any, item: BucketListItem) => (
    <CheckBox
      {...accessoryProps}
      checked={item.completed}
      onChange={() => props.onCheckListItem(item.id)}
    /> 
  )

  const [ showExecuted, setShowExecuted ] = React.useState(false);

  const onCheckedChange = (isChecked: boolean) => {
    setShowExecuted(isChecked);
  }

  return (
    <Layout level='2' style={{flex: 1}}>
      <View style={{
        alignItems: 'flex-start',
        margin: 14, 
      }}>
        <Toggle checked={showExecuted} onChange={onCheckedChange}>
          Ausgeführte anzeigen
        </Toggle>
      </View>

      <ScrollView>
        {renderListItems()}
      </ScrollView>
    </Layout>
  )
}

const StyledBucketListScreen = withStyles(BucketListScreen, theme => ({
  container: {

  }
}))

export { StyledBucketListScreen as BucketListScreen }