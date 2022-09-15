import { Notification } from "./interfaces";

const API = "https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app";

export const loadNotificationsFromRest = async () => {
  const result = await fetch(`${API}/notifications`);
  const { entries } = await result.json();
  return entries as Notification[];
};
