import React from "react";
import styled from "styled-components";
import LanguageContext from "context/LanguageContext";

function Home() {
  return <LanguageContext.Consumer>{(language) => <div>{language.hello}</div>}</LanguageContext.Consumer>;
}

export default Home;
