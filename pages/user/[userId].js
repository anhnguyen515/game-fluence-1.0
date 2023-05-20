import { getUserDetailAPI } from "@/apis/user";
import InnerLayout from "@/layout/InnerLayout";
import { SITE_NAME } from "@/utils/constants";
import { NextSeo } from "next-seo";
import React from "react";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { userId } = context.params;
  const data = await getUserDetailAPI(userId).then((res) => res.data);

  if (!data.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userId,
      data,
    },
    revalidate: 3600,
  };
}

export default function UserDetailPage({ userId, data }) {
  const { user } = data;
  return (
    <>
      <NextSeo
        title={`User: ${user.displayName} - ${SITE_NAME}`}
        description={`${user.displayName}'s information`}
        openGraph={{
          images: [
            {
              url: user.avatarUrl,
              type: "image/png",
            },
          ],
        }}
      />
      <InnerLayout
        title={user.displayName}
        subtitle={user.description}
        avatar={user.avatarUrl || user.displayName[0]}
        img={user.backgroundUrl}
      >
        In development
      </InnerLayout>
    </>
  );
}
