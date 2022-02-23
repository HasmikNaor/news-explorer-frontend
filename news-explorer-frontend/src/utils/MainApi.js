import { checkResponse } from './auth';

const _todayCalculation = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  return today;
};
const _daysBeforeCalculation = () => {
  let daysBefore = new Date();
  daysBefore.setDate(daysBefore.getDate() - 7);
  const dd = String(daysBefore.getDate()).padStart(2, '0');
  const mm = String(daysBefore.getMonth() + 1).padStart(2, '0');
  const yyyy = daysBefore.getFullYear();
  daysBefore = `${yyyy}-${mm}-${dd}`;

  return daysBefore;
};

const getArticles = (keyword) => {
  const pageSize = 100;
  const today = _todayCalculation();
  const daysBefore = _daysBeforeCalculation();

  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${daysBefore}&to=${today}&pageSize=${pageSize}&apiKey=7179a03434c1498d9844463a459ac5ed`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => checkResponse(res));
};

export default getArticles;
