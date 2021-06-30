export const shortenDisplayName = (displayName) => {
  if (!displayName) return;

  let result = "";
  let shortName = displayName.split(" ");
  if (shortName.length > 1) {
    result = shortName[0] + " " + shortName[1].split("")[0];
  } else {
    result = shortName[0];
  }
  return result;
};
