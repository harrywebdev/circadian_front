import { format } from 'date-fns';

export async function fetchDaylogs(from, to) {
  const baseUrl = `${process.env.VUE_APP_API_URL}/daylogs`;

  const response = await fetch(`${baseUrl}?from=${format(from, 'yyyy-MM-dd')}&to=${format(to, 'yyyy-MM-dd')}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();

  return data.daylogs;
}
