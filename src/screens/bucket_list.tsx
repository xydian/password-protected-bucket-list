import React from 'react'
import { withStyles, Layout, ListItem, List, EvaProp, Divider } from '@ui-kitten/components'

interface BucketListItem {
  title: string 
  conditions: string 
  performed: boolean
}

const listItems: BucketListItem[] = [
  {
    title: 'Visit Spain', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
    title: 'Visit Spain123', 
    conditions: 'Balearen zählen nicht', 
    performed: true 
  },
  {
    title: 'Visit Spain1234', 
    conditions: 'Balearen zählen nicht', 
    performed: false 
  },
  {
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
      appearance='alternative'
    />
  );

  return (
    <Layout level='2'>
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