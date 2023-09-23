import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchAllCharacters } from "../api.ts";
import { useEffect, useState } from "react";
import { CircularProgress, Container } from "../components/Custom.tsx";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { DisneyCharacter } from "../data-type.ts";

const CHARACTERS_PER_PAGE = 20;

export const Title = styled.h1`
  font-size: 48px;
`;

export const Line = styled.hr`
  width: 183px;
  margin-top: 27px;
  margin-bottom: 125px;
`;

export const CharactersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
`;

export const CharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 247px;
  transition:
    background-color 0.1s ease,
    border-radius 0.1s ease;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    border-radius: 10%;
  }
`;

export const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  transition: border-radius 0.1s ease;

  ${CharacterBox}:hover & {
    border-radius: 10% 10% 0 0;
  }
`;

export const CharacterName = styled.span`
  margin-top: 9px;
  font-size: 24px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 27px;
  margin-bottom: 25px;
  font-size: 18px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCharacters, setDisplayedCharacters] = useState<
    DisneyCharacter[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [erroredImages, setErroredImages] = useState<string[]>([]);
  const { data: characters, isLoading } = useQuery<DisneyCharacter[], Error>(
    "characters",
    fetchAllCharacters,
  );

  const handleImageError = (imageUrl: string) => {
    setErroredImages((prev) => [...prev, imageUrl]);
  };

  useEffect(() => {
    if (characters) {
      const filteredCharacters = debouncedSearchTerm
        ? characters.filter((char) =>
            char.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
          )
        : characters;

      setDisplayedCharacters(
        filteredCharacters.slice(0, CHARACTERS_PER_PAGE * currentPage),
      );
    }
  }, [characters, currentPage, debouncedSearchTerm]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) {
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <Container>
      <Helmet>
        <title>Disney Characters</title>
      </Helmet>

      <Title>Disney Characters</Title>

      <SearchInput
        placeholder="Search for a character..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Line />

      {displayedCharacters && displayedCharacters.length > 0 && (
        <CharactersRow>
          {displayedCharacters
            .filter((char) => !erroredImages.includes(char.imageUrl))
            .map((char) => (
              <Link key={char.id} to={`/character/${char.id}`}>
                <CharacterBox>
                  <CharacterImage
                    src={char.imageUrl}
                    alt={char.name}
                    onError={() => handleImageError(char.imageUrl)}
                  />
                  <CharacterName>{char.name}</CharacterName>
                </CharacterBox>
              </Link>
            ))}
        </CharactersRow>
      )}
    </Container>
  );
}

export default Home;
