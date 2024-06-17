import LottieView from 'lottie-react-native';

export const Loading = () => {
  return (
    <LottieView
      autoPlay
      style={{
        width: 80,
        height: 80,
      }}
      source={require('../assets/animation/pokeball.json')}
    />
  );
};
