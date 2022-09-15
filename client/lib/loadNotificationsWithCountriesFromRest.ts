import { Notification } from "./interfaces";

const API = "https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app";

export const loadNotificationsWithCountriesFromRest = async () => {
  const result = await fetch(`${API}/notifications`);
  const { entries } = (await result.json()) as { entries: Notification[] };
  return Promise.all(
    entries.map(async (entry) => {
      const result = await fetch(
        `${API}/users/${entry.reaction.givenBy.userId}`
      );
      const user = await result.json();
      entry.reaction.givenBy.country = user.country;
      return entry;
    })
  );
};
