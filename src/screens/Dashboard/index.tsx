import React from "react";
import {View, Text} from "react-native";
import {Transition} from "react-native-reanimated";
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
  LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolemento Site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/042022",
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolemento App",
      amount: "R$ 10.000,00",
      category: {
        name: "Vendas",
        icon: "coffee",
      },
      date: "13/042022",
    },
  ];

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
          <LogoutButton onPress={ ()=>{  }} >
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
