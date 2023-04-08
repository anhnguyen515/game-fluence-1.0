import { signupAPI } from "@/apis/user";
import { selectUser, setUser } from "@/store/slices/userSlice";
import { getRandomInt } from "@/utils/utils";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { LoadingButton } from "@mui/lab";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const backgroundImages = [
  {
    img: `/img/login_backgrounds/1.jpg`,
    src: "https://pin.it/23f2NHO",
  },
  {
    img: `/img/login_backgrounds/2.jpg`,
    src: "https://pin.it/6jQ9LMk",
  },
  {
    img: `/img/login_backgrounds/3.jpg`,
    src: "https://pin.it/7gRv3ZL",
  },
  {
    img: `/img/login_backgrounds/4.jpg`,
    src: "https://pin.it/12fWEyN",
  },
  {
    img: `/img/login_backgrounds/5.jpg`,
    src: "https://pin.it/37q84id",
  },
  {
    img: `/img/login_backgrounds/6.jpg`,
    src: "https://pin.it/607OqFd",
  },
  {
    img: `/img/login_backgrounds/7.jpg`,
    src: "https://pin.it/12bRWUM",
  },
  {
    img: `/img/login_backgrounds/8.jpg`,
    src: "https://pin.it/41DUfB7",
  },
  {
    img: `/img/login_backgrounds/9.jpg`,
    src: "https://pin.it/5SY7qCe",
  },
  {
    img: `/img/login_backgrounds/10.jpg`,
    src: "https://pin.it/5s2G0bh",
  },
  {
    img: `/img/login_backgrounds/11.jpg`,
    src: "https://pin.it/YF8nrzj",
  },
  {
    img: `/img/login_backgrounds/12.jpg`,
    src: "https://pin.it/7MLmyVd",
  },
];

export default function SignupPage() {
  const userStore = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [randomInt, setRandomInt] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    signupAPI({ email, password })
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
          toast.error(data.msg);
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
    const user = Cookies.get("user");
    if (user) {
      router.replace("/");
    }
  }, []);

  React.useEffect(() => {
    setRandomInt(getRandomInt(backgroundImages.length - 1, 0));
  }, []);

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
          {!userStore ? (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: { xs: "100%", md: "50%" },
                height: "60vh",
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
                  Sign up for{" "}
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
                    <TextField
                      label="Confirm password"
                      type={showPassword ? "text" : "password"}
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
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
                      disabled={
                        !email ||
                        !password ||
                        !passwordConfirm ||
                        password !== passwordConfirm
                      }
                      loading={loading}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign Up
                    </LoadingButton>
                    <Stack
                      direction={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      <Button onClick={() => router.replace("/auth/login")}>
                        I already have an account
                      </Button>
                    </Stack>
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
