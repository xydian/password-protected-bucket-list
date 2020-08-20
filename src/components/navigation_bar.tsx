import React from 'react'
import { withStyles, TopNavigation, EvaProp, TopNavigationAction, Icon, OverflowMenu, MenuItem } from '@ui-kitten/components'
import { StatusBar } from 'react-native'

interface Props {
  eva?: EvaProp
}

const EditIcon = (props: any) => (
  <Icon {...props} name='plus'/>
);

const MenuIcon = (props: any) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props: any) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props: any) => (
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
        <MenuItem accessoryLeft={LogoutIcon} title='Sperren'/>
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