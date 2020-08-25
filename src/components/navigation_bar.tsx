import React from 'react'
import { 
  withStyles, 
  TopNavigation, 
  EvaProp, 
  TopNavigationAction, 
  OverflowMenu, 
  MenuItem 
} from '@ui-kitten/components'
import { StatusBar } from 'react-native'
import { 
  MenuIcon, 
  EditIcon, 
  DarkModeIcon, 
  InfoIcon, 
  LogoutIcon, 
  HelpIcon
} from './icon_components';
import { AppState, toggleDarkMode } from '../redux/appReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

interface Props {
  signOutCallback: () => void
  onPressAdd: () => void

  eva?: EvaProp
}

function NavigationBar(props: Props){
  const appState: AppState = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

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
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={HelpIcon} title='Hilfe' onPress={() => alert('Halten Sie einen Eintrag lange gedrückt um ihn zu löschen')} />
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={DarkModeIcon} title={appState.darkMode ? 'Light Mode' : 'Dark Mode'} onPress={() => dispatch(toggleDarkMode())} />
        <MenuItem accessoryLeft={LogoutIcon} title='Sperren' onPress={props.signOutCallback} />
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <TopNavigation
      // accessoryLeft={BackAction}
      title='Bucket List'
      style={props.eva.style.topNavigation}
      accessoryRight={renderRightActions}
    />
  )
}

const StyledNavigationBar = withStyles(NavigationBar, theme => ({
  topNavigation: {
    marginTop: StatusBar.currentHeight, 
    borderBottomWidth: 1, 
    borderBottomColor: theme['color-basic-transparent-400'],
  }
}))

export { StyledNavigationBar as NavigationBar }