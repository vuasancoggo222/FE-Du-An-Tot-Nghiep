import useSWR from "swr";
import instance from "../api/instance";
import * as method from "../api/booking";

const fetcher = async (url) => await instance.get(url);

const endpoint = "/booking";

const useBooking = () => {
  const { data, error, mutate } = useSWR(endpoint, fetcher, {
    refreshInterval: 3000,
  });
  const useGetOne = async (id) => {
    const revalidate = await method.httpGet(endpoint, id);
    mutate(revalidate);
  };
  const create = async (data) => {
    const revalidate = await method.httpPost(endpoint, data);
    mutate([...data, revalidate]);
  };
  const remove = async (id) => {
    await method.httpDelete(endpoint, id);
    const revalidate = data.filter((item) => item.id !== id);
    mutate(revalidate);
  };

  const update = async (id, data) => {
    const newData = await method.httpPut(endpoint, id, data);
    const revalidate = data.map((item) => (item.id == id ? newData : item));
    mutate(revalidate);
  };
  return {
    data,
    error,
    useGetOne,
    create,
    remove,
    update,
  };
};

export default useBooking;