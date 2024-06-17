import { Box } from 'theme';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box flex={1} padding="spacing24">
      {children}
    </Box>
  );
};
