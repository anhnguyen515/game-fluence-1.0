import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import parse from "html-react-parser";

export default function ReadMore({ paragraph, fontSize = "0.9rem" }) {
  const heightRef = React.useRef(null);

  const [readMore, setReadMore] = React.useState(true);

  React.useLayoutEffect(() => {
    const height = heightRef.current.clientHeight;
    setReadMore(height > 84);
  }, []);

  return (
    <div>
      <Box
        className={readMore ? "line-clamp-3" : null}
        ref={heightRef}
        sx={{ lineHeight: "32px", color: "text.main", fontSize: fontSize }}
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
    </div>
  );
}
