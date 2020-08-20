import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { BucketListScreen } from './src/screens/bucket_list';
import { StatusBar, View } from 'react-native';
import { NavigationBar } from './src/components/navigation_bar';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationBar />
      <BucketListScreen />
    </ApplicationProvider>
  );
}