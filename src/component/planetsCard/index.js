import React from 'react';
import {View, Text} from 'react-native';
import {map} from 'lodash';

const PlanetsCard = item => {
  const {data} = item;
  const {node} = data;
  const renderFilms = () => {
    return map(node.filmConnection.edges, item => {
      const {node} = item;
      return <Text key={node.id}>{node.title} / </Text>;
    });
  };
  return (
    <>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <Text style={{fontWeight: '700', fontSize: 15}}>
          Planets:{node.name}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <Text style={{fontWeight: '700'}}>Films: </Text>
          {renderFilms()}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: 'gray',
          height: 1,
          marginBottom: 10,
          marginTop: 10,
        }}
      />
    </>
  );
};

export default PlanetsCard;
