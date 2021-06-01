import React, {useState, useEffect} from "react";
import {Modal , TouchableNativeFeedback , Keyboard, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {InputForm} from "../../compontes/Form/InputForm";
import {Button} from "../../compontes/Form/Button";
import {TransactionTypeButton} from "../../compontes/Form/TransactionTypeButton";
import {CategorySelectButton} from "../../compontes/Form/CategorySelectButton";
import {CategorySelect} from "../../screens/CategorySelect";
import { useForm  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import uuid from  "react-native-uuid";



interface  FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const schema = yup.object().shape({
    name: yup.string().required("Nome e obrigadotiro"),
    amount: yup.number().required("Valor e obrigatorio"),
  });
  const dataKey = "@gofinances:transctions"
  const { control, handleSubmit, reset,  formState:{ errors } } = useForm(
    {resolver: yupResolver(schema)})

  const  navigation  =useNavigation();


  async function handleRegister(form:FormData) {
    if (!transactionType)
     return Alert.alert("Selecione um tipo de transação")
     if (category.key=="categoria")
     return Alert.alert("Selecione uma categoria")

    const dataNew = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date,
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) :[];
      const dataFormat =[
        ...currentData,
        dataNew
      ]
      await AsyncStorage.setItem(dataKey , JSON.stringify(dataFormat))

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem")

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar!")

    }

  }

  useEffect(() => {
      async function loadData(){
        const data = AsyncStorage.getItem(dataKey)
      }
      loadData()

  }, [])

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
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
            name="amount"
            control={control}
            placeholder="Valor"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}

      />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === "positive"}
              onPress={() => handleTransactionTypeSelect("positive")}
            ></TransactionTypeButton>

            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === "negative"}
              onPress={() => handleTransactionTypeSelect("negative")}
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
