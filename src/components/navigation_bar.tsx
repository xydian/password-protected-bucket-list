import React from 'react'
import { withStyles, TopNavigation, EvaProp, TopNavigationAction, Icon, OverflowMenu, MenuItem } from '@ui-kitten/components'
import { StatusBar } from 'react-native'
import { MenuIcon, EditIcon, DarkModeIcon, InfoIcon, LogoutIcon } from './icon_components';

interface Props {
  signOutCallback: () => void
  onPressAdd: () => void

  darkMode: boolean
  toggleDarkMode: () => void

  eva?: EvaProp
}

function NavigationBar(props: Props){
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  )

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} onPress={props.onPressAdd} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={DarkModeIcon} title={props.darkMode ? 'Light Mode' : 'Dark Mode'} onPress={props.toggleDarkMode} />
        <MenuItem accessoryLeft={LogoutIcon} title='Sperren' onPress={props.signOutCallback} />
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <TopNavigation
      // accessoryLeft={BackAction}
      title='Bucket List'
      style={{
        marginTop: StatusBar.currentHeight, 
        borderBottomWidth: 1, 
        borderBottomColor: props.eva.theme['color-basic-transparent-400'],
      }}
      accessoryRight={renderRightActions}
    />
  )
}

const StyledNavigationBar = withStyles(NavigationBar, theme => ({

}))

export { StyledNavigationBar as NavigationBar }