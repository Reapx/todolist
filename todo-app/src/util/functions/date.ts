export const convertDate = (dateInput: string): string => {
  const date = new Date(dateInput);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`; // Formats the date as 'DD.MM.YYYY'
};
