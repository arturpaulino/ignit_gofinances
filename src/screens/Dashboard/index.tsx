import React, {useEffect, useState} from "react";
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

import {HighlightCard} from "../../compontes/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../compontes/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  TransactionList,
  Title,
  LogoutButton,
  LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface highlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setisLoading ] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, sethighlightData] = useState<highlightData>(
    {} as highlightData
  );


  function getLasTransactionDate(
    collection : DataListProps[],
    type: 'positive'|'negative' ){

    const lastTransaction = new Date (
       Math.max.apply(Math,
      collection.filter( item  =>   item.type ==type)
      .map(item  => new Date(item.date).getTime()) )) ;

     return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`;

  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transctions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount: amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionsFormatted);
    const lastTransactionEntries =  getLasTransactionDate( data, 'positive');
    const lastTransactionExpensives =  getLasTransactionDate( data, 'negative');
    const totalInteval =  `01 a ${lastTransactionExpensives}`;


    const total = entriesTotal - expensiveTotal;
    sethighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInteval,
      },
    });
    setisLoading(false)
  }

  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [])
  );

  useEffect(() => {
    //  const dataKey = "@gofinances:transctions";
    //    const response =  AsyncStorage.removeItem(dataKey);

    loadTransactions();
  }, []);



  return (
    <Container>

    { isLoading ?
        <LoadContainer>
          <ActivityIndicator color="red"
          size="large"
          />
        </LoadContainer> :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo
                source={{
                  uri: "https://i.pinimg.com/236x/dc/ef/3a/dcef3abedf0e0761203aaeb85886a6f3--jedi-knight-open-source.jpg",
                }}
              />
              <User>
                <UserGreeting>Ola</UserGreeting>
                <UserName>Artur Palino</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={() => {}}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            type="up"
            title="Entradas "
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          ></HighlightCard>
          <HighlightCard
            type="down"
            title="Saidas "
            amount={highlightData.expensive.amount}
            lastTransaction={highlightData.expensive.lastTransaction}
          ></HighlightCard>
          <HighlightCard
            type="total"
            title="total "
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
          ></HighlightCard>
        </HighlightCards>
        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <TransactionCard data={item} />}
          ></TransactionList>
        </Transactions>
    </>}
  </Container>
  );
}
