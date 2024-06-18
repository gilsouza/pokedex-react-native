import { useTheme } from '@shopify/restyle';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.red,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokedex',
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.red,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="backtrack"
        options={{
          title: 'Mochila',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
        }}
      />
    </Tabs>
  );
}
