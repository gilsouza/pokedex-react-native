import { Link, Stack } from 'expo-router';
import { Box, Text, makeStyles } from 'theme';

export default function NotFoundScreen() {
  const styles = useStyles();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} justifyContent="center" alignItems="center" padding="spacing24">
        <Text variant="title">Esta tela não existe!</Text>
        <Link href="/" style={styles.link}>
          <Text variant="body" color="gray">
            Voltar para home!
          </Text>
        </Link>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    marginTop: theme.spacing.spacing16,
    paddingVertical: theme.spacing.spacing16,
  },
}));
