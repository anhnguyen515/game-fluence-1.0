import { loginAPI } from "@/apis/user";
import useAuth from "@/hooks/useAuth";
import { setUser } from "@/store/slices/userSlice";
import { backgroundImages } from "@/utils/constants";
import { getRandomInt } from "@/utils/utils";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function LoginPage() {
  const isLoggedIn = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [randomInt, setRandomInt] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    loginAPI({ email, password })
      .then((res) => {
        const data = res.data;
        if (data.ok) {
          Cookies.set("user", JSON.stringify(data.user), { expires: 3 });
          dispatch(setUser(data.user));
          setLoading(false);
          toast.success(data.msg);
          router.back();
        } else {
          setLoading(false);
          setErrorMsg(data.msg);
        }
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 5000)
      );
  }

  React.useEffect(() => {
    setRandomInt(getRandomInt(backgroundImages.length - 1, 0));
  }, []);

  if (isLoggedIn) {
    router.replace("/");
  }

  return (
    <>
      <Box
        sx={{
          position: isSmallScreen ? "absolute" : "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: isSmallScreen ? "100%" : "50%",
          backgroundImage: `linear-gradient(${
            isSmallScreen ? "0deg" : "90deg"
          }, ${theme.palette.background.default}, ${
            theme.palette.background.default + "99"
          }), url(${randomInt !== null && backgroundImages[randomInt].img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -2,
        }}
      />
      {randomInt !== null && (
        <Button
          color="text"
          component={"a"}
          href={backgroundImages[randomInt].src}
          size="small"
          target="_blank"
          sx={{ position: "fixed", bottom: 10, right: 10 }}
        >
          Image source
        </Button>
      )}
      <Container maxWidth="2xl">
        <Box
          sx={{
            px: { xs: 0, md: 3 },
            py: 3,
          }}
        >
          {!isLoggedIn ? (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "100%", md: "50%" },
              }}
            >
              <Stack
                gap={5}
                sx={{
                  width: "100%",
                  maxWidth: 600,
                }}
              >
                <Typography
                  fontSize={"1.8rem"}
                  textAlign={"center"}
                  variant="h1"
                >
                  Log in to{" "}
                  <Typography
                    color={"primary"}
                    component={"span"}
                    fontSize={"1.8rem"}
                    variant="h1"
                  >
                    GameFluence
                  </Typography>
                </Typography>
                <form onSubmit={handleLogin}>
                  <Stack gap={3}>
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <VisibilityOffRoundedIcon />
                              ) : (
                                <VisibilityRoundedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <LoadingButton
                      disabled={!email || !password}
                      loading={loading}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Log In
                    </LoadingButton>
                    <Stack
                      direction={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      <Button onClick={() => router.replace("/auth/signup")}>
                        I don&apos;t have an account
                      </Button>
                      <Button>I forgot my password</Button>
                    </Stack>
                    {errorMsg !== "" && (
                      <Alert
                        onClose={() => setErrorMsg("")}
                        severity="error"
                        variant="outlined"
                      >
                        {errorMsg}
                      </Alert>
                    )}
                  </Stack>
                </form>
              </Stack>
            </Stack>
          ) : (
            <Stack
              alignItems={"center"}
              direction={"row"}
              gap={1}
              justifyContent={"center"}
              mt={3}
              sx={{
                width: { xs: "100%", md: "50%" },
                height: "50vh",
              }}
            >
              <CircularProgress size={24} />
              <Typography>You have logged in. Redirecting...</Typography>
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
}
