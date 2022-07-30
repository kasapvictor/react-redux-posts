import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { added, selectors } from './store';
import { Properties } from './components';
import { buildUrl } from './utils';
import { fetchAll } from './api';

/*
"deadmou59@gmail.com" => "LfHVkw962-7z6fYJXQr3g8", // test
"barbara@barbarabenotto.com" => "s9cGvHfj02HJz5yTMg9Aw4",
"chris@soldbyshep.com" => "xjRaXFY@U@IX5njYqmEtnD",
 */
const BASE_URL = 'https://services.wowmi.us/api/web/api/v1/idx/articles';

export const App = ({ email, status, sendTo }) => {
  const dispatch = useDispatch();
  const url = buildUrl(BASE_URL, email, status);
  const [isFetching, setIsFetching] = useState(false);
  const sendToEmail = sendTo ?? email;

  useEffect(() => {
    fetchAll(url).then((data) => {
      if (data.length === 0) {
        // eslint-disable-next-line no-console
        console.warn(`NO DATA: ${status} objects for ${email}`);
      }

      if (data.length > 0) {
        const formattedData = Object.entries(data[0].json_data).map(([itemId, item], id) => ({
          id,
          itemId,
          ...item,
        }));

        setIsFetching(true);
        dispatch(added(formattedData));
      }
    });
  }, []);

  return <>{isFetching && <Properties selectors={selectors} status={status} sendTo={sendToEmail} />}</>;
};
