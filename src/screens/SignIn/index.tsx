import React, {useState, useEffect, useContext } from "react";

import LogoSVG   from '../../assets/Finance.svg';
import AppleSVG  from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import {Container, Header,TitleWrapper,Title, SignInTitle, Footer,FooterWrapper } from "./styles";

import {SignInSocialBt} from "../../compontes/SignInSocialBt"
import { useAuth} from "../../hooks/auth"

export function SignIn() {
  const { user }  = useAuth()
 console.log("data", user.name )

  return (
    <Container>
      <Header>

        <TitleWrapper>
          <LogoSVG  width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle suas {'\n'} categoria finanças de forma {'\n'} muito simples</Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com {'\n'} uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
      <FooterWrapper>
        <SignInSocialBt
          title="Entrar com Google"
          svg={GoogleSVG}
        />

        <SignInSocialBt
          title="Entrar com Aplle"
          svg={AppleSVG}
        />
      </FooterWrapper>


      </Footer>
    </Container>
  );
}
