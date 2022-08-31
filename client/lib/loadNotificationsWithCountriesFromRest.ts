import { Notification } from "./interfaces";

export const loadNotificationsWithCountriesFromRest = async () => {
  const result = await fetch(
    "https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/notifications"
  );
  const { entries } = await result.json();
  return Promise.all(
    entries.map(async (entry: Notification) => {
      const result = await fetch(
        `https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/users/${entry.reaction.givenBy.userId}`
      );
      const user = await result.json();
      entry.reaction.givenBy.country = user.country;
      return entry;
    })
  );
};
