import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const sortValues = [
  {
    name: "Popularity",
    value: "popularity",
  },
  {
    name: "Released date",
    value: "released-date",
  },
  {
    name: "Metascore",
    value: "metascore",
  },
];

export default function SortComp() {
  const router = useRouter();
  const { slug, ...queries } = router.query;

  function handleChangeOrdering(e) {
    router.push({
      pathname: slug
        ? router.pathname.replace("[slug]", slug)
        : router.pathname,
      query: {
        ...queries,
        sort: e.target.value,
      },
    });
  }

  function handleReverseOrder(e) {
    router.push({
      pathname: slug
        ? router.pathname.replace("[slug]", slug)
        : router.pathname,
      query: {
        ...queries,
        reverse: e.target.checked,
      },
    });
  }

  return (
    <Stack alignItems={"center"} direction={"row"} gap={3}>
      <Stack alignItems={"center"} direction={"row"} spacing={-1}>
        <Typography>Sorted by</Typography>
        <Select
          onChange={handleChangeOrdering}
          size="small"
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          defaultValue={queries.sort || "popularity"}
        >
          {sortValues.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={queries.reverse === "true"}
              onChange={handleReverseOrder}
              size="small"
            />
          }
          label="Reverse"
        />
      </FormGroup>
    </Stack>
  );
}
