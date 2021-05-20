import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  .themeChange {
    background-color: ${({ theme }) => theme.themeChange};
  }
  .language_hover:hover{
    background-color: transparent !important;
  }
  .content {
    padding:5px
  }
  .text_icon
  {
    font-size:30px;
    color: silver;
  }
  .shadow_box {
    -webkit-box-shadow: 0px 0px 4px 0px #000000; 
    box-shadow: 0px 0px 4px 0px #000000;
}
.shadow_box:hover {
  -webkit-box-shadow: 0px 0px 10px 1px  ${({ theme }) => theme.hover_color};
  box-shadow: 0px 0px 10px 1px  ${({ theme }) => theme.hover_color};
}
  `