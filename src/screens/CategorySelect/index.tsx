import React from "react";
import { FlatList } from "react-native";
import {Container, Header, Category, Icon, Title,  Name, Separator,
  Footer
} from "./styles";
import { categories} from "../../utils/categories"

import {Button} from "../../compontes/Form/Button"

interface Category{
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void;
  closeCategory: () => void;
}

export function CategorySelect({ category, closeCategory, setCategory }: Props ) {
  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%'  }}
        keyExtractor={(item) => item.key}
        renderItem={ ({ item })  =>(
          <Category>
            <Icon name={item.icon} />
            <Name> {item.name} </Name>
            </Category>
        )}
        ItemSeparatorComponent={ ()=> <Separator></Separator> }
      />
      <Footer>
        <Button title="Selecionar"/>
      </Footer>
    </Container>
  );
}
