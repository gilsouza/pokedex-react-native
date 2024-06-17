import LottieView from 'lottie-react-native';

export const Loading = () => {
  return (
    <LottieView
      autoPlay
      source={require('../assets/animation/pokeball.json')}
      style={{
        width: 80,
        height: 80,
      }}
    />
  );
};
