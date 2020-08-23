import Head from "next/head";
import styled from "styled-components";
import useTopHeadlines, { Article, Author } from "../../hooks/useTopHeadlines";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageTitle = styled.span`
  margin: 10px;
  line-height: 1.15;
  font-size: 3rem;
  color: white;
  letter-spacing: 5px;
  &a:hover {
    text-decoration: underline;
  }
`;

const SearchContainer = styled.div`
  width: 600px;
  position: relative;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 3px solid #ffffff;
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px;
  outline: none;
  color: #9dbfaf;

  &:focus {
    color: black;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 36px;
  border: 0px;
  background: transparent;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Grid = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  height: calc(100% - 45px);
  overflow: scroll;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 225px;
  padding: 8px;
  margin: 1rem;
  position: relative;
  border-bottom: 1px solid #989898;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: calc(100% - 55px);
  object-fit: cover;
  overflow: hidden;
`;

const CardText = styled.span`
  font-size: 15px;
  font-weight: 200;
`;

const LeftPanel = styled.div`
  flex: 2.5;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem 0 1rem 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const RightPanel = styled.div`
  flex: 1;
  background-color: white;
  margin: 1rem 1rem 1rem 0;
`;

const RightPanelHeader = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin: 0.5rem;
`;

const NewsDetailCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const NewsDetailContainer = styled.div`
  position: absolute;
  width: 100%;
  max-height: 500px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(0 0 0 / 87%) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  bottom: 0;
  padding-bottom: 10px;
`;

const NewsContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  flex-direction: row;
  height: calc(100vh - 170px);
  overflow: hidden;
`;

const NewsBrand = styled.span`
  color: white;
  background-color: #ff0000cc;
  padding: 5px;
  margin-left: 10px;
`;

const NewsText = styled.span`
  color: white;
  text-align: left;
  margin: 10px;
  display: block;
  font-size: 15px;
  font-weight: 300;
`;

const NewsContainerFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NewsAuthor = styled.a`
  color: white;
  margin: 10px;
  font-size: 15px;
  font-weight: 300;
`;

const NewsReadMoreButton = styled.a`
  height: 35px;
  background-color: transparent;
  border: none;
  float: right;
  margin-right: 40px;
  cursor: pointer;
  color: white;
  display: inline-flex;
`;

const NewsReadMoreButtonText = styled.span`
  font-weight: 300;
  line-height: 35px;
  font-size: 15px;
`;

const NewsReadMoreButtonIcon = styled(FontAwesomeIcon)`
  width: 30px;
  margin-left: 10px;
`;

const NewsTitle = styled(NewsText)`
  font-size: 30px;
  font-weight: 500;
`;

export const HomePage = () => {
  const [searchText, setSearchText] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>();
  const { data } = useTopHeadlines(searchQuery);
  const [selectedNews, setSelectedNews] = useState<Article>();

  useEffect(() => {
    if (data) {
      setSelectedNews(data.topHeadlines?.articles[0]);
    }
  }, [data]);

  const onSearchSubmit = () => setSearchQuery(searchText);

  const AuthorText = ({ author }: { author: string }) => {
    if (!author) {
      return <NewsAuthor></NewsAuthor>;
    }
    if (!author.includes("@type")) {
      return <NewsAuthor>by {author}</NewsAuthor>;
    }
    const parsedAuthor: Author = JSON.parse(author)?.[0];
    if (!parsedAuthor) {
      return <NewsAuthor></NewsAuthor>;
    }
    return (
      <NewsAuthor href={parsedAuthor.url} target={"_blank"}>
        by {parsedAuthor.name} ({parsedAuthor.jobTitle})
      </NewsAuthor>
    );
  };

  return (
    <Container>
      <Head>
        <title>News Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <PageTitle>Welcome to News Room!</PageTitle>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="What are you looking for?"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton type="submit" onClick={onSearchSubmit}>
            <FontAwesomeIcon icon={faSearch} />
          </SearchButton>
        </SearchContainer>
        <NewsContainer>
          <LeftPanel>
            {selectedNews && (
              <>
                <NewsDetailCardImage src={selectedNews.urlToImage} />
                <NewsDetailContainer>
                  <NewsBrand>{selectedNews.source.name}</NewsBrand>
                  <NewsTitle>{selectedNews.title}</NewsTitle>
                  <NewsText>
                    {new Date(selectedNews.publishedAt).toDateString()}
                  </NewsText>
                  <NewsText>{selectedNews.content}</NewsText>
                  <NewsContainerFooter>
                    <AuthorText author={selectedNews.author} />
                    <NewsReadMoreButton
                      href={selectedNews.url}
                      target={"_blank"}
                    >
                      <NewsReadMoreButtonText>READ MORE</NewsReadMoreButtonText>
                      <NewsReadMoreButtonIcon icon={faArrowAltCircleRight} />
                    </NewsReadMoreButton>
                  </NewsContainerFooter>
                </NewsDetailContainer>
              </>
            )}
          </LeftPanel>
          <RightPanel>
            <RightPanelHeader>
              {searchQuery && data?.topHeadlines?.totalResults >= 0
                ? `Total Results: ${data?.topHeadlines?.totalResults}`
                : "Trending Posts"}
            </RightPanelHeader>
            <Grid>
              {data?.topHeadlines?.articles.map((article, index) => (
                <Card key={index} onClick={() => setSelectedNews(article)}>
                  <CardImage src={article.urlToImage} />
                  <CardText>{article.title}</CardText>
                </Card>
              ))}
            </Grid>
          </RightPanel>
        </NewsContainer>
      </Main>
    </Container>
  );
};

export default HomePage;
