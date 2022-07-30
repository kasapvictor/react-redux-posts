/* eslint no-console: 0 */
import axios from 'axios';

export const fetchAll = async (url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    if (!err.isAxiosError) {
      console.log('Network Error');
      return false;
    }
    console.log('Unknown Error:', err);
    throw err;
  }
};
