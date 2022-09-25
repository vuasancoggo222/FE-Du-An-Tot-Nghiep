import useSWR from "swr";
import instance from "../api/instance";
import * as method from "../api/services";

const fetcher = async (url) => await instance.get(url);

const endpoint = "/employees";

const useEmployee = () => {
  const { data, error, mutate } = useSWR(endpoint, fetcher, {
    refreshInterval: 3000,
  });
  const create = async (data) => {
    const employees = await method.httpPost(endpoint, data);
    mutate([...data, employees]);
  };
  const remove = async (id) => {
    await method.httpDelete(endpoint, id);
    const employees = data.filter((item) => item.id !== id);
    mutate(employees);
  };

  const update = async (id, data) => {
    const updateData = await method.httpPut(endpoint, id, data);
    const employees = data.map((item) => (item.id == id ? updateData : item));
    mutate(employees);
  };
  return {
    data,
    error,
    create,
    remove,
    update,
  };
};
export default useEmployee;
