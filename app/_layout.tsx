import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ThemeProvider } from '@shopify/restyle';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import { theme } from 'theme';

import { asyncStoragePersister, queryClient } from '~/service/clientConfig';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <ThemeProvider theme={theme}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RootSiblingParent>
      </PersistQueryClientProvider>
    </ThemeProvider>
  );
}
