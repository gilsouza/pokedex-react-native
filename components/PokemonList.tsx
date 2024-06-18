import { useTheme } from '@shopify/restyle';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable } from 'react-native';

import { Loading } from './Loading';
import { PokemonCard } from './PokemonCard';

import { PokemonListInfo } from '~/model/PokemonInfo';
import { Box, Text } from '~/theme';

interface PokemonListProps {
  isFetching: boolean;
  pagination?: {
    isFetchingNextPage: boolean;
    loadMore: () => void;
  };
  pokemons: PokemonListInfo[];
}

const PokemonList = ({ pokemons, pagination, isFetching }: PokemonListProps) => {
  const theme = useTheme();
  const { isFetchingNextPage, loadMore } = pagination || {};

  const renderItem = ({ item }: { item: PokemonListInfo }) => {
    return (
      <Link
        href={{
          pathname: '[id]',
          params: {
            id: item.id,
          },
        }}
        asChild>
        <Pressable style={{ flex: 1 }}>
          <PokemonCard pokemon={item} contentFit="contain" />
        </Pressable>
      </Link>
    );
  };

  const renderListFooter = () => {
    return isFetchingNextPage ? <ActivityIndicator size="large" color={theme.colors.red} /> : null;
  };

  const renderListEmpty = () => {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" paddingTop="spacing64">
        {isFetching ? <Loading /> : <Text>Nenhum pokemon por aqui...</Text>}
      </Box>
    );
  };

  return (
    <FlatList
      columnWrapperStyle={{
        padding: theme.spacing4,
        height: 180,
      }}
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={renderListEmpty()}
      ListFooterComponent={renderListFooter()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

export { PokemonList };
export type { PokemonListProps };
