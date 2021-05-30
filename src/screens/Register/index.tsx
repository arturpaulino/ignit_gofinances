import React, {useState} from "react";
import {Modal , TouchableNativeFeedback , Keyboard, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

import {Input} from "../../compontes/Form/Input";
import {InputForm} from "../../compontes/Form/InputForm";

import {Button} from "../../compontes/Form/Button";
import {TransactionTypeButton} from "../../compontes/Form/TransactionTypeButton";
import {CategorySelectButton} from "../../compontes/Form/CategorySelectButton";
import {CategorySelect} from "../../screens/CategorySelect";
import { useForm  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface  FormData {
  name: string;
  amout: string;
}

export function Register() {
  const [transactionType, SetTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const schema = yup.object().shape({
    name: yup.string().required("Nome e obrigadotiro"),
    amout: yup.number().positive().integer().required("Valor e obrigatorio"),
  });


  const { control, handleSubmit,  formState:{ errors } } = useForm(
    {resolver: yupResolver(schema)})


  function handleRegister(form:FormData) {
    if (!transactionType)
     return Alert.alert("Selecione um tipo de transação")
     if (category.key=="categoria")
     return Alert.alert("Selecione uma categoria")



    const data = {
      name: form.name,
      amout: form.amout,
      transactionType,
      category: category.key,
    }

    console.log(data);
  }

  function handleTransactionTypeSelect(type: "up" | "down") {
    SetTransactionType(type);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header>
        <Title>Teste</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}

            />
            <InputForm
            name="amout"
            control={control}
            placeholder="Valor"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}

      />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === "up"}
              onPress={() => handleTransactionTypeSelect("up")}
            ></TransactionTypeButton>

            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === "down"}
              onPress={() => handleTransactionTypeSelect("down")}
            ></TransactionTypeButton>
          </TransactionTypes>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          ></CategorySelectButton>
        </Fields>
        <Button title="Enviar" onPress={handleSubmit(handleRegister)} ></Button>
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
    </TouchableNativeFeedback>
  );
}
