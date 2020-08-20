import React from 'react'
import { withStyles, TopNavigation, EvaProp, TopNavigationAction, Icon, OverflowMenu, MenuItem } from '@ui-kitten/components'
import { StatusBar } from 'react-native'

interface Props {
  eva?: EvaProp
}

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

function NavigationBar(props: Props){
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <TopNavigation
      // accessoryLeft={BackAction}
      title='Bucket List'
      style={{marginTop: StatusBar.currentHeight, borderBottomWidth: 1, borderBottomColor: props.eva.theme['color-basic-transparent-400']}}
      accessoryRight={renderRightActions}
    />
  )
}

const StyledNavigationBar = withStyles(NavigationBar, theme => ({

}))

export { StyledNavigationBar as NavigationBar }