import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Shake from './src/component/index';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

const App: () => Node = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Shake />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
