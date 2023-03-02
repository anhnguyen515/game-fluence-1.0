import { getGameDetailAPI } from "@/apis/game";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME } from "@/utils/constants";
import { Breadcrumbs, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const gameDetail = await getGameDetailAPI(slug).then((res) => res.data);
  if (gameDetail.detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      gameDetail,
    },
  };
}

export default function GameDetailPage({ slug, gameDetail }) {
  const title = gameDetail.name;
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${title} - ${SITE_NAME}`}
        canonical={router.pathname.replace("[slug]", slug)}
        openGraph={{ url: router.asPath }}
      />

      <InnerLayout
        title={title}
        titleFontSize={"3.5rem"}
        subtitle={
          <Breadcrumbs>
            <Link href={"/"}>
              <Typography color={"text.main"}>Home</Typography>
            </Link>
            <Link href={"/games"}>
              <Typography color={"text.main"}>Games</Typography>
            </Link>
            <Typography>{title}</Typography>
          </Breadcrumbs>
        }
        img={gameDetail.background_image}
      >
        <pre>{JSON.stringify(gameDetail, null, 2)}</pre>
      </InnerLayout>
    </>
  );
}
