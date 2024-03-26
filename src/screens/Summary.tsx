import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {SimpleGrid} from 'react-native-super-grid';
import {ISummaryGridItem} from '../interfaces/SummaryGridItem';
import {useNavigation} from '@react-navigation/native';
import SummaryItem from '../components/SummaryItem';

export const Summary = () => {
  const navigation = useNavigation<any>();
  const [summary, setSummary] = useState<ISummaryGridItem[]>([]);
  const transactionsService = TransactionsService.getInstance();

  useEffect(() => {
    const load = () => {
      const summaryArray = transactionsService.calculateSummary();

      setSummary(summaryArray);
    };

    load();

    const unsubscribe = navigation.addListener('tabPress', () => load());

    return unsubscribe;
  }, [navigation, transactionsService]);

  return (
    <View style={styles.container}>
      <SimpleGrid
        listKey={'label'}
        itemDimension={130}
        data={summary}
        renderItem={({item}) => <SummaryItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030317',
  },
});
