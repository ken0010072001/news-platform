import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { media } from '../utils/style'
import  { format } from 'date-fns'

const Card = styled.a`
  width: 333px;
  height: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
  ${media.desktop`
    margin-top: 60px;
  `}
  ${media.tablet`
    margin-top: 40px;
  `}
  ${media.mobile`
    margin-top: 60px;
  `}
`
const ArticleInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`

const PubliserWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const PubliserLogo = styled.div`
  height: 30px;
  width: 30px;
  background-color: #bdbdbd;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 28px;
  color: #fafafa;
  margin-left: 15px;
`
const ArticleInfo = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
`
const Publiser = styled.p`
    font-size: 5px;
    font-weight: 700;
    width: 100%;
`
const ArticleDate = styled.div`
    width: 100%;
    color: rgba(0, 0, 0, 0.54);
    font-size: 10px;
    font-weight: 400;
`
const ArticleImg = styled.img`
  width: 100%;
  min-height: 226px;
`
const ArticleDetail = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`


const ArticleTitle = styled.h1`
  width: 100%;
  margin: 0;
  font-size: 21px;
  color: rgba(0, 0, 0, 0.87);
`

const ArticleSub = styled.h2`
  width: 100%;
  height: auto;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
`

function NewsCard({article}) {
  const publiser = get(article.source, 'name', '')
  const articleDate = get(article, 'publishedAt', '')
  const date = new Date(articleDate)
  const datePattern = 'yyyy-MM-dd HH:mm'
  const dateOutput = format(date, datePattern)
  const FirstChPubliser = publiser.substring(0, 1)
  const articleImg = get(article, 'urlToImage', '')
  const articleTitle = get(article, 'title', '')
  const articleDescript = get(article, 'description', '')
  const articleUrl = get(article, 'url', '')

  return (
    <Card href={articleUrl}>
      <ArticleInfoWrapper >
        <PubliserWrapper>
          <PubliserLogo> {FirstChPubliser}</PubliserLogo>
        </PubliserWrapper>
        <ArticleInfo>
          <Publiser>{publiser}</Publiser>
          <ArticleDate>{dateOutput}</ArticleDate>
        </ArticleInfo>
      </ArticleInfoWrapper>
      <ArticleImg alt={articleTitle} src={articleImg}/>
      <ArticleDetail>
        <ArticleTitle>{articleTitle}</ArticleTitle>
        <ArticleSub>{articleDescript}</ArticleSub>
      </ArticleDetail>
    </Card>
  );
}

export default NewsCard;
