import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      page: 1,
      pageCount: 7,
    };
  }
  componentDidMount() {
    const apiKey = "c2d6b648cfb303b5ae02208a5c91d208";
    const { page } = this.state;
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&append_to_response=release_dates&page=${page}`;

    axios.get(upcomingUrl).then((response) => {
      // console.log(response.data.results);
      this.setState({
        movieList: response.data.results,
      });
    });
  }

  handlePageChange = (event, value) => {
    this.setState({ page: value });
  };

  render() {
    const { movieList, pageCount, page } = this.state;
    const startIndex = (page - 1) * 3;
    const endIndex = startIndex + 3;
    const movieListCurrentlyShowing = movieList.slice(startIndex, endIndex);

    return (
      <div className="App">
        <div className="navbar">FILMORA</div>
        <div className="movie-list">
          {movieListCurrentlyShowing.map((movie) => (
            <Card
              sx={{
                width: "30%",
                height: "58vh",
                marginBottom: "1rem",
              }}
            >
              <Link
                to={`/movie/${movie.id}`}
                style={{
                  border: "none",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            count={pageCount}
            page={page}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
