import { Tabs } from 'expo-router';

import { theme } from '~/theme';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokedex',
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.red,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="backtrack"
        options={{
          title: 'Tab Tree',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
