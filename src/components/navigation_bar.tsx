import React from 'react'
import { withStyles, TopNavigation, EvaProp } from '@ui-kitten/components'
import { StatusBar } from 'react-native'

interface Props {
  eva?: EvaProp
}

function NavigationBar(props: Props){
  return (
    <TopNavigation
      // accessoryLeft={BackAction}
      title='Eva Application'
      style={{marginTop: StatusBar.currentHeight, borderBottomWidth: 1, borderBottomColor: props.eva.theme['xyz']}}
    />
  )
}

const StyledNavigationBar = withStyles(NavigationBar, theme => ({

}))

export { StyledNavigationBar as NavigationBar }