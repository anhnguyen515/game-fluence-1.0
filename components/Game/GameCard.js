import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function GameCard({ game }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        sx={{ width: "100%", aspectRatio: "2/1" }}
        image={game.background_image}
        title={game.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          fontSize={"1.3rem"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {game.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}
