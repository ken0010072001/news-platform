import React from 'react'
import { media } from '../utils/style/'
import styled from 'styled-components'

const HeaderBar = styled.div`
  width: 100%;
  background-color: #3c3b63;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  color: #ffffff;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  ${media.desktop`
    width: 1024px;
    height: 100%;
  `}
  ${media.mobile`
    justify-content: space-around;
  `}
`


const HeaderTitle = styled.div`
  color: #ffffff;
  font-weight: 400;
  font-size: 20px;
  margin: 15px 0 15px 10px;
`

const SearchField = styled.div`
  color: #ffffff;
  margin: 5px 10px 5px 0;
  > input {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    height: 33px;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 16px;
      padding-left: 10px;
      color: rgba(255, 255, 255, 0.42);
    }
    :-ms-input-placeholder {
      font-size: 16px;
      padding-left: 10px;
      color: rgba(255, 255, 255, 0.42)
    }
  }
`


function Header() {

  return (
    <HeaderBar>
      <HeaderWrapper>
        <HeaderTitle>US NEWS</HeaderTitle>
        <SearchField>
          <input
            type="text"
            placeholder="Search"
          />
        </SearchField>
      </HeaderWrapper>
    </HeaderBar>
  )
}

export default Header;
