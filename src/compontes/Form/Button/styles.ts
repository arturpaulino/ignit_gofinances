import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from "react-native";

export const Container = styled.View`    width:100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};

  padding:18px;
  border-radius: 5px;
  align-items: center;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium}
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};

`;
