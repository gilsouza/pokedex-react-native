import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { Input } from '~/components/Input';
import { PokemonInfo } from '~/model/PokemonInfo';
import { usePokemons } from '~/service/api';
import { Box, Text } from '~/theme';

export default function Home() {
  const theme = useTheme();
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = usePokemons();

  const pokemons = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.results) : [];
  }, [data]);

  const renderItem = ({ item }: { item: PokemonInfo }) => {
    const firstTypeName = item.types?.at(0)?.name;
    const colorHex =
      (`${firstTypeName}Dark` as keyof typeof theme.colors) || theme.colors.steelLight;

    return (
      <Box flex={1} height={200} padding="spacing8">
        <Box
          flex={1}
          elevation={5}
          borderRadius="borderRadii12"
          padding="spacing32"
          alignContent="center"
          justifyContent="center"
          backgroundColor="white">
          <Box
            height={25}
            width={55}
            borderRadius="borderRadii12"
            backgroundColor={colorHex}
            alignContent="center"
            justifyContent="center"
            style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text variant="tag" textAlign="center" color="white">
              {`#${item.order.toString().padStart(3, '0')}`}
            </Text>
          </Box>

          <Image
            style={{
              flex: 1,
            }}
            source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${item.id}.gif`}
            placeholder="blurhash"
            contentFit="contain"
            transition={1000}
          />
          <Text variant="body" textAlign="center" marginTop="spacing12">
            {item.name}
          </Text>
        </Box>
      </Box>
    );
  };

  const renderListFooter = () => {
    return isFetchingNextPage ? <ActivityIndicator size="large" color={theme.colors.red} /> : null;
  };

  const renderListEmpty = () => {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        {isFetching ? (
          <LottieView
            autoPlay
            style={{
              width: 80,
              height: 80,
            }}
            source={require('../../assets/animation/pokeball.json')}
          />
        ) : (
          <Text>No data available</Text>
        )}
      </Box>
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box>
      <Input placeholder="capture seu pokemon" margin="spacing8" marginBottom="spacing4" />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          ...(!pokemons.length && {
            flex: 1,
          }),
        }}
        ListFooterComponent={renderListFooter()}
        ListEmptyComponent={renderListEmpty()}
        numColumns={2}
      />
    </Box>
  );
}
