import React , { useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { media } from '../utils/style/'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'

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

const SearchField = styled.form`
  color: #ffffff;
  margin: 5px 10px 5px 0;
  display: flex;
  align-items: center;
  > input {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    height: 33px;
    color: #ffffff;
    font-size: 13px;
    outline: none;
    ${media.mobile`
      width: 67px;
    `}
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

const SearchLogo = styled.img`
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 0.15);
  padding: 5px 0 5px 10px;
` 

const RemoveInput = styled.img`
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 0.15);
  padding: 5px 10px 5px 0;
`

const apiKey = '398aaec7c9e843dab54d24151bef6a3d'


function Header() {
  const dispatch = useDispatch()
  const searchForm = useRef(null)
  const searchState = useSelector(state => state.searching)

  const removeInput = () => {
    document.getElementById("search-form").reset();
    dispatch({
      type: 'SET_SEARCH_ARTICLES',
      searchArticles: []
    })
    dispatch({
      type: 'SET_SEARCH_STATE',
      searching: false
    })
  }

  const doSearch = (evt) => {
    let searchText = evt.target.value;// this is the search text
    if(!isEmpty(searchText)) {
      if (!searchState) { //is false then set to searching
        dispatch({
          type: 'SET_SEARCH_STATE',
          searching: true
        })
      }
      setTimeout(() => {
        axios.get(`https://newsapi.org/v2/everything?q=${searchText}&apiKey=${apiKey}&pageSize=100`)
        .then(res => {
          dispatch({
            type: 'SET_SEARCH_ARTICLES',
            searchArticles: res.data.articles
          })
        })
        //search function
      }, 300);
    } else {
      dispatch({
        type: 'SET_SEARCH_ARTICLES',
        searchArticles: []
      })
      dispatch({
        type: 'SET_SEARCH_STATE',
        searching: false
      })
    }
  }

  return (
    <HeaderBar>
      <HeaderWrapper>
        <HeaderTitle>US NEWS</HeaderTitle>
        <SearchField id="search-form">
          <SearchLogo src="search.svg" />
          <input
            type="text"
            placeholder="Search"
            onChange={evt => doSearch(evt)}
          />
          <RemoveInput src="delete.svg"  onClick={removeInput} type="reset"/>
        </SearchField>
      </HeaderWrapper>
    </HeaderBar>
  )
}

export default Header;
