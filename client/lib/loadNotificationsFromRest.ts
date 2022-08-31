export const loadNotificationsFromRest = async () => {
  const result = await fetch(
    "https://madeup-social-mockoon-ul7dy2h3tq-uc.a.run.app/notifications"
  );
  const { entries } = await result.json();
  return entries;
};
