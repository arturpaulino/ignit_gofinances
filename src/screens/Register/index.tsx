import React,  {useState}from "react";
import {Container, Header, Title, Form, Fields, TransactionTypes} from "./styles";

import {Input} from "../../compontes/Form/Input";
import {Button} from "../../compontes/Form/Button";
import {TransactionTypeButton} from "../../compontes/Form/TransactionTypeButton";
import {CategorySelectButton} from "../../compontes/Form/CategorySelectButton";

export function Register() {
  const [transactionType, SetTransactionType] = useState("");

  function handleTransactionTypeSelect( type: 'up'|'down'){
    SetTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Teste</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome"></Input>
          <Input placeholder="Valor"></Input>
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={ transactionType=== 'up'}
              onPress={ () => handleTransactionTypeSelect("up")}
            ></TransactionTypeButton>

            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType=== 'down'}
              onPress={ () => handleTransactionTypeSelect("down")}

        ></TransactionTypeButton>
          </TransactionTypes>
          <CategorySelectButton title="Categoria"></CategorySelectButton>

        </Fields>
        <Button title="Enviar"></Button>
      </Form>
    </Container>
  );
}
