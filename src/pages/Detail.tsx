import styled from "styled-components";
import { fetchCharacterDetail, searchMovieByTitle } from "../api";
import { CircularProgress, Container } from "../components/Custom";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { DisneyCharacter } from "../data-type.ts";

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  border-radius: 10px;
  background-color: #ffcccc;
  color: #cc0000;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;

export const MenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 790px;
  height: 58px;
  border-radius: 10%;
  background-color: ${(props) => props.theme.accentColor};
  padding: 0 25px;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CharacterDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 790px;
  align-items: center;
  padding: 0 25px;
  margin: 24px auto 0 auto;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const CharacterName = styled.h2`
  font-size: 32px;
  margin: 0;
  text-align: left;
`;

export const CircleCharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

export const RelatedFilmsTitle = styled.h3`
  font-size: 24px;
  margin: 52px 0 24px 0;
  text-align: left;
  width: 90%;
  max-width: 790px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const FilmsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: flex-start;
  width: 90%;
  max-width: 790px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const FilmBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  height: 272px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px accentColor;
  }
`;

export const FilmImage = styled.img`
  width: 160px;
  height: 220px;
  object-fit: cover;
`;

export const FilmTitle = styled.span`
  margin-top: 10px;
  font-size: 16px;
`;

interface FilmType {
  title: string;
  poster: string;
}

function Menu() {
  return (
    <MenuBar>
      <Link to="/">
        <IconButton>
          <FaHome size={24} />
        </IconButton>
      </Link>
    </MenuBar>
  );
}

function DetailPage() {
  const { id } = useParams();
  const [relatedFilms, setRelatedFilms] = useState<FilmType[]>([]);

  const {
    data: characterDetail,
    isLoading,
    isError,
    error,
  } = useQuery<DisneyCharacter>(
    ["characterDetail", id],
    () => (id ? fetchCharacterDetail(id) : Promise.reject("ID is missing")),
    {
      onSuccess: async (data: DisneyCharacter) => {
        const films = (
          await Promise.all(
            data.films?.map((film) => searchMovieByTitle(film)) || [],
          )
        ).filter(Boolean) as FilmType[];
        setRelatedFilms(films);
      },
    },
  );

  if (isError) {
    return (
      <Container>
        <Menu />
        <ErrorBox>Oops! An error occurred: {(error as Error).message}</ErrorBox>
      </Container>
    );
  }

  if (isLoading || !characterDetail) {
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
      <Menu />

      {characterDetail && (
        <>
          <CharacterDetailRow>
            <CharacterName>{characterDetail.name}</CharacterName>
            <CircleCharacterImage
              src={characterDetail.imageUrl}
              alt={characterDetail.name}
            />
          </CharacterDetailRow>

          <RelatedFilmsTitle>Related Films</RelatedFilmsTitle>
          <FilmsRow>
            {relatedFilms.map((film, index) => (
              <FilmBox key={index}>
                <FilmImage src={film.poster} alt={film.title} />
                <FilmTitle>{film.title}</FilmTitle>
              </FilmBox>
            ))}
          </FilmsRow>
        </>
      )}
    </Container>
  );
}

export default DetailPage;
