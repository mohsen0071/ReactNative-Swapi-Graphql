import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import RNShake from 'react-native-shake';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PlanetsCard from './planetsCard';
import {map} from 'lodash';
import Toast from 'react-native-simple-toast';

const Query = gql`
  query repoQuery($after: String) {
    allPlanets(first: 3, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          filmConnection {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        cursor
      }
    }
  }
`;

const Shake = () => {
  const [planetsData, setPlantesData] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const {data, error, loading, fetchMore} = useQuery(Query, {
    variables: {after: null},
  });

  useEffect(() => {
    if (data) {
      setPlantesData(data.allPlanets.edges);
      const subscription = RNShake.addListener(onUndo);
      return () => subscription.remove();
    }
  }, [data]);

  const onUndo = () => {
    Toast.showWithGravity('Device was shaken!', Toast.LONG, Toast.CENTER);
    const {endCursor} = data.allPlanets.pageInfo;
    fetchMore({
      variables: {after: endCursor},
      updateQuery: (prevResult, {fetchMoreResult}) => {
        console.log(fetchMoreResult.allPlanets.pageInfo.endCursor);
        fetchMoreResult.allPlanets.edges = [
          ...prevResult.allPlanets.edges,
          ...fetchMoreResult.allPlanets.edges,
        ];
        return fetchMoreResult;
      },
    });
  };
  const renderPlanets = () => {
    return map(planetsData, (item, index) => {
      return <PlanetsCard data={item} key={index} />;
    });
  };

  return <View>{renderPlanets()}</View>;
};

export default Shake;
