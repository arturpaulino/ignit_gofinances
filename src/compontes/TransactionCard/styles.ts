import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";

interface TransactionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
  background-color: ${({ theme, }) => theme.colors.shape};
  border-radius: 5px;

  padding: 17px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
`;
export const Amount = styled.Text< TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => type === 'positive' ? theme.colors.success : theme.colors.attention};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Date = styled.Text`
`;

export const CategoryName = styled.Text`
`;
