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
import { GiTrophy } from "react-icons/gi";

const routes = [
  {
    name: `Popular In ${dayjs().subtract(1, "year").year()}`,
    category: "popular-last-year",
    icon: <GiTrophy />,
  },
  {
    name: "New & upcoming",
    category: "new-and-upcoming",
    icon: <StarRoundedIcon />,
  },
  {
    name: "Last 30 days",
    category: "last-30-days",
    icon: <SkipPreviousIcon />,
  },
  {
    name: "This week",
    category: "this-week",
    icon: <LocalFireDepartmentIcon />,
  },
  {
    name: "Next week",
    category: "next-week",
    icon: <SkipNextIcon />,
  },
  {
    name: "All Games",
    category: null,
    icon: null,
  },
];

export default function GamesNavigator() {
  const router = useRouter();
  const { category } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    router.pathname.includes("/games") ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      <div className="w-full ">
        <Button
          color={router.pathname.includes("/games") ? "primary" : "text"}
          fullWidth
          onClick={() => handleShowSubcategories()}
          size="large"
          sx={{
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: router.pathname.includes("/games") ? "bold" : "normal",
          }}
        >
          Games {showSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showSubcategories && (
          <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
            {routes.map((i) => (
              <Button
                color={
                  category === i.category ||
                  (router.pathname.includes("/games") &&
                    !i.category &&
                    !category)
                    ? "primary"
                    : "text"
                }
                key={i.slug}
                onClick={() =>
                  router.push({
                    pathname: "/games",
                    query: {
                      category: i.category,
                    },
                  })
                }
                size="large"
                startIcon={i.icon}
                sx={{
                  fontWeight:
                    category === i.category ||
                    (router.pathname.includes("/games") &&
                      !i.category &&
                      !category)
                      ? "bold"
                      : "normal",
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
