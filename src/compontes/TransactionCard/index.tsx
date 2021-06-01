import React from "react";
import {View, Text} from "react-native";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Date,
  Icon,
  CategoryName,
} from "./styles";

import {categories} from "../../utils/categories";

interface Category {
  key?: string;
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}
export function TransactionCard({data}: Props) {
  const category = categories.filter(
    item => item.key == data.category

  )[0]
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type == "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
