import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Movie.css";

function Movie() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const apiKey = "c2d6b648cfb303b5ae02208a5c91d208";
    const release = "&append_to_response=release_dates";
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}${release}`;

    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="movie__container">
      <Card sx={{ maxWidth: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              {movie.release_date}
            </Typography>
            <Typography gutterBottom variant="body3" component="div">
              {movie.tagline}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Movie;
