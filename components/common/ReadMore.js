import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import parse from "html-react-parser";

export default function ReadMore({ paragraph }) {
  const heightRef = React.useRef(null);

  const [readMore, setReadMore] = React.useState(true);

  React.useLayoutEffect(() => {
    const height = heightRef.current.clientHeight;
    setReadMore(height > 56);
  }, []);

  return (
    <>
      <Box
        className={readMore ? "line-clamp-2" : null}
        ref={heightRef}
        sx={{ lineHeight: "32px", color: "text.dark", fontSize: "0.9rem" }}
      >
        {parse(paragraph)}
      </Box>
      {readMore && (
        <Stack alignItems={"flex-end"}>
          <Button
            color="text"
            onClick={() => setReadMore((prev) => !prev)}
            size="small"
            startIcon={readMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          >
            {readMore ? "Read more" : "Show less"}
          </Button>
        </Stack>
      )}
    </>
  );
}
