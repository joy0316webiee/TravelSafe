export const sortByDate = dataArray => {
  return dataArray.sort((a, b) => {
    return new Date(b.created_dt).getTime() - new Date(a.created_dt).getTime();
  });
};

export const today = () => {
  const tempDate = new Date();
  const today = `${tempDate.getMonth() +
    1}.${tempDate.getDate()}.${tempDate.getFullYear()}`;

  return today;
};

export const isToday = date => {
  // return new Date(today()).getTime() === new Date(date).getTime();

  return new Date('09.03.2019').getTime() === new Date(date).getTime();
};
