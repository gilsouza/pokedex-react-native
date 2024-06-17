import { useTheme } from '@shopify/restyle';
import { ActivityIndicator, FlatList } from 'react-native';

import { Loading } from './Loading';
import { PokemonCard } from './PokemonCard';

import { PokemonInfo } from '~/model/PokemonInfo';
import { Box, Text } from '~/theme';

interface PokemonListProps {
  isFetching: boolean;
  isFetchingNextPage: boolean;
  loadMore: () => void;
  pokemons: PokemonInfo[];
}

const PokemonList = ({ pokemons, isFetchingNextPage, isFetching, loadMore }: PokemonListProps) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: PokemonInfo }) => (
    <PokemonCard pokemon={item} contentFit="contain" />
  );

  const renderListFooter = () => {
    return isFetchingNextPage ? <ActivityIndicator size="large" color={theme.colors.red} /> : null;
  };

  const renderListEmpty = () => {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" paddingTop="spacing64">
        {isFetching ? <Loading /> : <Text>No data available</Text>}
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
