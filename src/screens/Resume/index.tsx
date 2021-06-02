import React, {useState, useEffect} from "react";
import {Container, Header, Title, LoadContainer, Content} from "./styles";
import {HistoryCard} from "../../compontes/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {categories} from "../../utils/categories";
import { ActivityIndicator } from "react-native"

export interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface categoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [isLoading, setisLoading ] = useState(true);
  const [totalByResumo, setTotalByResumo] = useState<categoryData[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transctions";
    const data = await AsyncStorage.getItem(dataKey);
    const currentData = data ? JSON.parse(data) : [];
    /*
    const expensives = currentData.filter(
      (item: TransactionData) => (item.type = "negative")
    );
    */
    const expensives = currentData;
    const totalByCategory: categoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category == category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color
        });
        setTotalByResumo( totalByCategory);
      }
    });
    console.log("totalByCategory", totalByCategory);
    setisLoading(false)
  }
  useEffect(() => {
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
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {

          totalByResumo.map( item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))
      }
      </Content>

   </>}
    </Container>
  );
}
