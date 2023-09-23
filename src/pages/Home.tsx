import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import { fetchAllCharacters } from "../api.ts";
import { useState } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 135px 400px;

  @media (max-width: 1400px) {
    margin: 135px 200px;
  }

  @media (max-width: 700px) {
    margin: 135px 30px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
`;

export const Line = styled.hr`
  width: 183px;
  margin-top: 27px;
  margin-bottom: 60px;
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

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CircularProgress = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${rotateAnimation} 1s linear infinite;
`;

interface Character {
  id: string;
  imageUrl: string;
  name: string;
}

function Home() {
  const { data: characters, isLoading } = useQuery<Character[], Error>(
    "characters",
    fetchAllCharacters,
  );

  const [erroredImages, setErroredImages] = useState<string[]>([]);

  const handleImageError = (imageUrl: string) => {
    setErroredImages((prev) => [...prev, imageUrl]);
  };

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
      <Line />

      {characters && characters.length > 0 && (
        <CharactersRow>
          {characters
            .filter((char) => !erroredImages.includes(char.imageUrl))
            .map((char) => (
              <CharacterBox key={char.id}>
                <CharacterImage
                  src={char.imageUrl}
                  alt={char.name}
                  onError={() => handleImageError(char.imageUrl)}
                />
                <CharacterName>{char.name}</CharacterName>
              </CharacterBox>
            ))}
        </CharactersRow>
      )}
    </Container>
  );
}

export default Home;
