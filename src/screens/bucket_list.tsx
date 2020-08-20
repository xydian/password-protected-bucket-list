import React from 'react'
import { View } from 'react-native'
import { withStyles, Layout, ListItem, List, EvaProp, Divider, CheckBox, StyleType, Toggle } from '@ui-kitten/components'

interface BucketListItem {
  id: number
  title: string 
  conditions: string 
  performed: boolean
}

const listItems: BucketListItem[] = [
  {
    id: 1, 
    title: 'Visit Spain', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
    id: 2, 
    title: 'Visit Spain123', 
    conditions: 'Balearen zählen nicht', 
    performed: true 
  },
  {
    id: 3, 
    title: 'Visit Spain1234', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
    id: 4, 
    title: 'Visit Spain455', 
    conditions: 'Balearen zählen nicht', 
    performed: true 
  },
]

interface Props {
  eva?: EvaProp
}

function BucketListScreen(props: Props){
  const renderItem = ({ item, index }: { item: BucketListItem, index: number }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.conditions} ${index + 1}`}
      // appearance='alternative'
      // accessory={(style: StyleType, index: number) => renderAccessory(style, item.id)}
      accessoryRight={(props) => renderAccessory(props, item.id)}
    />
  );

  const onCheckBoxCheckedChange = (id: number) => {

  }

  const renderAccessory = (props: any, id: number) => (
    <CheckBox
      {...props}
      checked={true}
      onChange={() => onCheckBoxCheckedChange(id)}
    /> 
  ); 

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

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
        data={listItems}
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