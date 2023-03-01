import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FaAndroid, FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import { IoIosPhonePortrait } from "react-icons/io";
import { SiNintendoswitch } from "react-icons/si";

const routes = [
  {
    name: "PC",
    slug: "pc",
    icon: <FaWindows />,
  },
  {
    name: "PlayStation 5",
    slug: "playstation5",
    icon: <FaPlaystation />,
  },
  {
    name: "Xbox Series S/X",
    slug: "xbox-series-x",
    icon: <FaXbox />,
  },
  {
    name: "Nintendo Switch",
    slug: "nintendo-switch",
    icon: <SiNintendoswitch />,
  },
  {
    name: "iOS",
    slug: "ios",
    icon: <IoIosPhonePortrait />,
  },
  {
    name: "Android",
    slug: "android",
    icon: <FaAndroid />,
  },
  {
    name: "All Platforms",
    slug: null,
    icon: null,
  },
];

export default function GamesNavigator() {
  const router = useRouter();
  const { slug } = router.query;
  const [showSubcategories, setShowSubcategories] = React.useState(
    router.pathname.includes("/platforms") ? true : false
  );

  function handleShowSubcategories() {
    setShowSubcategories((prev) => !prev);
  }

  return (
    <>
      <div className="w-full ">
        <Button
          color={router.pathname.includes("/platforms") ? "primary" : "text"}
          fullWidth
          onClick={() => handleShowSubcategories()}
          size="large"
          sx={{
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: router.pathname.includes("/platforms")
              ? "bold"
              : "normal",
          }}
        >
          Platforms{" "}
          {showSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showSubcategories && (
          <Stack alignItems={"flex-start"} gap={1} pl={2} mt={1}>
            {routes.map((i) => (
              <Button
                color={
                  slug === i.slug ||
                  (router.pathname.includes("/platforms") && !i.slug && !slug)
                    ? "primary"
                    : "text"
                }
                key={i.slug}
                onClick={() =>
                  router.push({
                    pathname: i.slug ? `/platforms/${i.slug}` : "/platforms",
                  })
                }
                size="large"
                startIcon={i.icon}
                sx={{
                  fontWeight:
                    slug === i.slug ||
                    (router.pathname.includes("/platforms") && !i.slug && !slug)
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
