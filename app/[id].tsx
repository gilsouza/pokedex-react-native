import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

import { CaptureButton } from '~/components/CaptureButton';
import { Loading } from '~/components/Loading';
import { StatBar } from '~/components/StatBar';
import { TypeTag } from '~/components/TypeTag';
import { PokemonInfo } from '~/model/PokemonInfo';
import { usePokemonByNameOrId } from '~/service/api';
import { Box, Color, Text } from '~/theme';
import {
  convertDecimetersToMeters,
  convertHectogramsToKilograms,
  convertStatToStatInfo,
  getImageUrlById,
  toPokemonNumber,
} from '~/utils/pokemon';
import { capitalize } from '~/utils/strings';

export default function PokemonDetail() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemon, isFetching, isLoading } = usePokemonByNameOrId(id as string);

  const { name, types, weight, height, eggGroup, stats } = (pokemon || {}) as PokemonInfo;

  const firstTypeName = types?.at(0)?.name;
  const darkColor = theme.colors[`${firstTypeName}Dark` as keyof typeof theme.colors];
  const lightColor = theme.colors[`${firstTypeName}Light` as keyof typeof theme.colors];

  const renderLoading = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </Box>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: theme.colors.white,
          headerRight: () => <CaptureButton pokemon={pokemon} />,
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {(isFetching || isLoading) && renderLoading()}
        {pokemon && (
          <Box flex={1}>
            <Box height={400} marginTop="spacing64">
              <LinearGradient
                colors={[darkColor, lightColor]}
                start={[0, 0]}
                end={[1, 1]}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '-50%',
                  height: '100%',
                  borderRadius: 100,
                }}
              />
              <Image
                contentFit="contain"
                placeholder="blurhash"
                source={getImageUrlById(pokemon.id)}
                style={{
                  marginTop: 40,
                  height: 200,
                }}
                transition={100}
              />
              <Box flex={1} padding="spacing16">
                <Box marginBottom="spacing24">
                  <Text variant="large" textAlign="left">
                    {capitalize(name)}
                  </Text>
                  <Text variant="body" textAlign="left">
                    {toPokemonNumber(Number(id))}
                  </Text>
                </Box>

                <Text variant="body" textAlign="left" marginBottom="spacing8">
                  Tipo
                </Text>
                <Box marginBottom="spacing12" flexDirection="row">
                  {types.map((type) => (
                    <TypeTag key={type.name} text={type.name} color={`${type.name}Dark` as Color} />
                  ))}
                </Box>

                <Text variant="body" textAlign="left" marginBottom="spacing8">
                  Espécie
                </Text>
                <Box marginBottom="spacing24" flexDirection="row">
                  {eggGroup.map((eg) => (
                    <TypeTag key={eg.name} text={eg.name} color={`${eg.name}Dark` as Color} />
                  ))}
                </Box>

                <Box marginBottom="spacing24">
                  <Text variant="body" textAlign="left">
                    {`Altura: ${convertDecimetersToMeters(height)}`}
                  </Text>
                  <Text variant="body" textAlign="left">
                    {`Peso: ${convertHectogramsToKilograms(weight)}`}
                  </Text>
                </Box>

                {stats.map((stat) => (
                  <StatBar
                    key={stat.name}
                    label={stat.name}
                    {...convertStatToStatInfo(stat)}
                    colorFg={`${firstTypeName}Light` as Color}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </ScrollView>
    </>
  );
}
