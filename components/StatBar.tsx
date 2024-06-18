import React from 'react';

import { Box, Color, Text } from '~/theme';
import { capitalize } from '~/utils/strings';

interface StatBarProps {
  label?: string;
  max: number;
  actual: number;
  colorFg?: Color;
  colorBg?: Color;
}

export const StatBar = ({
  label,
  max,
  actual,
  colorBg = 'darkGray',
  colorFg = 'lightGray',
}: StatBarProps) => {
  const progress = (actual / max) * 100;

  return (
    <>
      {!!label && (
        <Text
          variant="stat"
          marginBottom="spacing4">{`${capitalize(label)}: ${actual}/${max}`}</Text>
      )}
      <Box
        width="100%"
        height={10}
        backgroundColor={colorBg}
        borderRadius="borderRadii6"
        marginBottom="spacing4"
        overflow="hidden">
        <Box height="100%" width={`${progress}%`} backgroundColor={colorFg} />
      </Box>
    </>
  );
};
