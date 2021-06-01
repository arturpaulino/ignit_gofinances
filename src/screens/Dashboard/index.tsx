import React, {useEffect, useState} from "react";
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
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transctions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriessum = 0;
    let expensive =0;


    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {

        if( item.type === 'positive' ) {
          entriessum += Number(item.amount)
        }else {
          expensive += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        console.log("amount", amount);

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
          amount="R$ 501,41"
          lastTransaction="dia 1 "
        ></HighlightCard>
        <HighlightCard
          type="down"
          title="Saidas "
          amount="R$ 501,41"
          lastTransaction="dia 1 "
        ></HighlightCard>
        <HighlightCard
          type="total"
          title="total "
          amount="R$ 000,00"
          lastTransaction="dia 1 "
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
    </Container>
  );
}
