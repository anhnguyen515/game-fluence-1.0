import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

const routes = [
  {
    name: "All Games",
    category: null,
    icon: null,
    alternateIcon: null,
  },
  {
    name: `Popular In ${dayjs().subtract(1, "year").year()}`,
    category: "popular-last-year",
    icon: null,
    alternateIcon: null,
  },
  {
    name: "New Releases",
    category: "new",
    icon: <ExpandMoreIcon />,
    alternateIcon: <ExpandLessIcon />,
  },
];

const newGamesSubRoutes = [
  {
    name: "New & upcoming",
    subcategory: "new-and-upcoming",
    icon: <StarRoundedIcon />,
  },
  {
    name: "Last 30 days",
    subcategory: "last-30-days",
    icon: <SkipPreviousIcon />,
  },
  {
    name: "This week",
    subcategory: "this-week",
    icon: <LocalFireDepartmentIcon />,
  },
  {
    name: "Next week",
    subcategory: "next-week",
    icon: <SkipNextIcon />,
  },
];

export default function GamesNavigator() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    category === "new" ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      {routes.map((item, index) => (
        <div key={index} className="w-full ">
          <Button
            color={
              (router.pathname === "/games" && !category && !item.category) ||
              category === item.category
                ? "primary"
                : "text"
            }
            fullWidth
            onClick={() => {
              if (item.category !== "new") {
                router.push(
                  item.category
                    ? {
                        pathname: "/games",
                        query: {
                          category: item.category,
                        },
                      }
                    : {
                        pathname: "/games",
                      }
                );
              } else {
                handleShowSubcategories();
              }
            }}
            size="large"
            sx={{
              justifyContent: "space-between",
              fontSize: "1.1rem",
              fontWeight:
                (router.pathname === "/games" && !category && !item.category) ||
                category === item.category
                  ? "bold"
                  : "normal",
            }}
          >
            {item.name} {showSubcategories ? item.alternateIcon : item.icon}
          </Button>
          {item.category === "new" && showSubcategories && (
            <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
              {newGamesSubRoutes.map((i) => (
                <Button
                  color={subcategory === i.subcategory ? "primary" : "text"}
                  key={i.subcategory}
                  onClick={() =>
                    router.push({
                      pathname: "/games",
                      query: {
                        category: item.category,
                        subcategory: i.subcategory,
                      },
                    })
                  }
                  size="large"
                  startIcon={i.icon}
                  sx={{
                    fontWeight:
                      subcategory === i.subcategory ? "bold" : "normal",
                  }}
                >
                  {i.name}
                </Button>
              ))}
            </Stack>
          )}
        </div>
      ))}
    </>
  );
}
