import { dateFormat } from "@/utils/utils";
import EventIcon from "@mui/icons-material/Event";
import { Chip, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          mb={1}
        >
          <Typography
            className="line-clamp-1"
            variant="h3"
            fontSize={"1.3rem"}
            fontWeight={600}
          >
            {game.name}
          </Typography>
          <Typography
            className={
              game.metacritic >= 75
                ? "text-green-500"
                : game.metacritic < 50
                ? "text-red-500"
                : "text-yellow-500"
            }
            fontSize={"1.1rem"}
            fontWeight={600}
            sx={{ border: 1, borderRadius: 1, px: 1 }}
          >
            {game.metacritic}
          </Typography>
        </Stack>

        <Stack alignItems={"center"} direction={"row"} gap={0.5} mb={1}>
          {game.genres.slice(0, 2).map((item, index) => (
            <Chip key={index} label={item.name} size="small" />
          ))}
          {game.genres.length > 2 && <Chip label="..." size="small" />}
        </Stack>
        <Typography
          fontSize={"0.9rem"}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EventIcon sx={{ fontSize: "0.9rem" }} />
          {dateFormat(game.released)}
        </Typography>
      </CardContent>
    </Card>
  );
}
