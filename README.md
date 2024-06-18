# Pokedex

Este é um projeto React Native de uma Pokedex simples.

![app](doc/img/app.gif)

## Requisitos

- `Node.js`: v18.18.0
- `Expo`: ^51.0.14

## Instalação

Para instalar e executar o projeto siga os passos abaixo:

1. Clone o repositório:

```sh
git clone git@github.com:gilsouza/pokedex-react-native.git
cd pokedex-react-native
```

2. Instale as dependências:

```sh
yarn
```

3. Inicie o projeto com o Expo:

```sh
yarn start
```

Após a inicialização do expo será apresentado um menu com as opções para execução do projeto no `Android` e `iOS`.

## Bibliotecas utilizadas

O projeto utiliza Expo como framework, conforme últimas recomendações do time do [React Native](https://reactnative.dev/docs/environment-setup).

- [`expo-router`](https://docs.expo.dev/router/introduction/): Diminui a quantidade de boilerplate e facilita a construção de navegação entre rotas no app. Ele é um wrapper do [react-navigation](https://reactnavigation.org/)
- [`expo-image`](https://docs.expo.dev/versions/latest/sdk/image/): Possui uma série de mecanismos para lidar com cacheamento e carregamento de imagens
- [`react-query`](https://tanstack.com/query/latest/docs/framework/react/overview): Possui uma grande API para gerenciamento de cache e controle de requisições HTTP.
- [`axios`](https://axios-http.com/ptbr/docs/intro): Utilizado como HTTP client junto ao `react-query`
- [`zustand`](https://zustand-demo.pmnd.rs/): Biblioteca para gerenciamento de estado global e persistencia do estado
- [`restyle`](https://shopify.github.io/restyle/): Escolhida por facilitar a leitura e manutenção dos componentes customizados. Possui uma API de fácil utilização. Ela diminui a quantidade de arquivos de style, além de otimizar a construção de themas, design system e etc.
