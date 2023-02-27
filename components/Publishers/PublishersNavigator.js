import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GridViewIcon from "@mui/icons-material/GridView";

const routes = [
  {
    name: "Electronic Arts",
    slug: "electronic-arts",
  },
  {
    name: "Square Enix",
    slug: "square-enix",
  },
  {
    name: "Ubisoft Entertainment",
    slug: "ubisoft-entertainment",
  },
  {
    name: "Microsoft Studios",
    slug: "microsoft-studios",
  },
  {
    name: "SEGA",
    slug: "sega-2",
  },
  {
    name: "2K Games",
    slug: "2k-games",
  },
  {
    name: "Bethesda Softworks",
    slug: "bethesda-softworks",
  },
];

export default function Navigator() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Stack
      alignItems={"flex-start"}
      gap={1}
      sx={{ position: "sticky", top: 16, overflow: "auto" }}
    >
      <Button
        color="text"
        fullWidth
        onClick={() => router.push(`/publishers`)}
        size="large"
        startIcon={<GridViewIcon />}
        sx={{
          fontSize: "1.1rem",
          justifyContent: "flex-start",
          "&:hover": {
            ".is-hover": {
              display: "block",
              ml: "auto",
            },
          },
        }}
      >
        All Publishers{" "}
        <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
      </Button>
      {routes.map((item, index) => (
        <Button
          key={index}
          color={slug === item.slug ? "primary" : "text"}
          fullWidth
          onClick={() => router.push(`/publishers/${item.slug}`)}
          size="large"
          sx={{
            fontSize: "1.1rem",
            fontWeight: slug === item.slug ? "bold" : "normal",
            justifyContent: "flex-start",
            "&:hover": {
              ".is-hover": {
                display: "block",
                ml: "auto",
              },
            },
          }}
        >
          {item.name}{" "}
          <ArrowRightIcon className="is-hover" sx={{ display: "none" }} />
        </Button>
      ))}
    </Stack>
  );
}
