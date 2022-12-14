import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { countryCodeEmoji } from "country-code-emoji";
import { Notification } from "../lib/interfaces";

import { loadNotificationsFromRest } from "../lib/loadNotificationsFromRest";
import { loadNotificationsWithCountriesFromRest } from "../lib/loadNotificationsWithCountriesFromRest";
import { loadNotificationsFromGraphQL } from "../lib/loadNotificationsFromGraphQL";
import { loadNotificationsWithCountriesFromGraphQL } from "../lib/loadNotificationsWithCountriesFromGraphQL";

import styles from "../styles/Home.module.css";

const loadNotifications = loadNotificationsFromRest;
// const loadNotifications = loadNotificationsWithCountriesFromRest;
// const loadNotifications = loadNotificationsFromGraphQL;
// const loadNotifications = loadNotificationsWithCountriesFromGraphQL;

const Home: NextPage = () => {
  const [notifications, setNotifictions] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true);
      loadNotifications().then((notifications) => {
        setNotifictions(notifications);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tampere ❤️ GraphQL</h1>
        <p className={styles.description}>
          Demo app: list of social network notificaitons
        </p>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.grid}>
            {notifications.map((notification) => (
              <div className={styles.card} key={notification.notificationId}>
                <Image
                  className={styles.avatar}
                  width={128}
                  height={128}
                  src={notification.reaction.givenBy.avatar}
                  alt="avatar"
                ></Image>
                <div>
                  <h2>
                    {notification.reaction.givenBy.firstname}{" "}
                    {notification.reaction.givenBy.lastname}{" "}
                    {notification.reaction.givenBy.country
                      ? countryCodeEmoji(notification.reaction.givenBy.country)
                      : ""}{" "}
                    reacted to your post
                  </h2>
                  <b>:{notification.reaction.reaction}:</b>
                  <p>{notification.reaction.post.contentShort}</p>
                  <p>
                    <em>in the</em>{" "}
                    <b>{notification.reaction.post.channel.name}</b>{" "}
                    <em>channel</em>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
