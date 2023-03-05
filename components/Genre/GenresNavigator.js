import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import {
  GiFloatingPlatforms,
  GiGunshot,
  GiPunch,
  GiRunningNinja,
  GiRustySword,
} from "react-icons/gi";
import { MdExplore } from "react-icons/md";

const routes = [
  {
    name: "Action",
    slug: "action",
    icon: <GiRustySword />,
    endIcon: null,
  },
  {
    name: "Adventure",
    slug: "adventure",
    icon: <MdExplore />,
    endIcon: null,
  },
  {
    name: "Platformer",
    slug: "platformer",
    icon: <GiFloatingPlatforms />,
    endIcon: null,
  },
  {
    name: "Shooter",
    slug: "shooter",
    icon: <GiGunshot />,
    endIcon: null,
  },
  {
    name: "RPG",
    slug: "role-playing-games-rpg",
    icon: <GiRunningNinja />,
    endIcon: null,
  },
  {
    name: "Fighting",
    slug: "fighting",
    icon: <GiPunch />,
    endIcon: null,
  },
  {
    name: "All Genres",
    slug: null,
    icon: null,
    endIcon: <ArrowRightIcon />,
  },
];

export default function GenresNavigator() {
  const router = useRouter();
  const { slug } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    router.pathname.includes("/genres") ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      <div className="w-full ">
        <Button
          color={router.pathname.includes("/genres") ? "primary" : "text"}
          fullWidth
          onClick={() => handleShowSubcategories()}
          size="large"
          sx={{
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: router.pathname.includes("/genres") ? "bold" : "normal",
          }}
        >
          Genres {showSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showSubcategories && (
          <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
            {routes.map((i) => (
              <Button
                key={i.slug}
                color={
                  slug === i.slug ||
                  (router.pathname.includes("/genres") && !i.slug && !slug)
                    ? "primary"
                    : "text"
                }
                endIcon={i.endIcon}
                fullWidth
                onClick={() =>
                  router.push({
                    pathname: i.slug ? `/genres/${i.slug}` : "/genres",
                  })
                }
                size="large"
                startIcon={i.icon}
                sx={{
                  fontWeight:
                    slug === i.slug ||
                    (router.pathname.includes("/genres") && !i.slug && !slug)
                      ? "bold"
                      : "normal",
                  justifyContent: "flex-start",
                }}
              >
                {i.name}
              </Button>
            ))}
          </Stack>
        )}
      </div>
    </>
  );
}
