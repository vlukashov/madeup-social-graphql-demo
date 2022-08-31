const query = /* GraphQL */ `
  {
    notificationList {
      entries {
        notificationId
        reaction {
          reactionId
          reaction
          givenBy {
            userId
            country
            firstname
            lastname
            avatar
          }
          post {
            postId
            contentShort
            channel {
              channelId
              name
            }
          }
        }
      }
    }
  }
`;

export const loadNotificationsWithCountriesFromGraphQL = async () => {
  const result = await fetch(
    "https://braselton.stepzen.net/api/madeup-social/__graphql",
    {
      method: "POST",
      headers: {
        Authorization: `APIKey ${process.env.STEPZEN_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  const {
    data: {
      notificationList: { entries },
    },
  } = await result.json();

  return entries;
};
