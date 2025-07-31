import axios from "axios";

export const fetchUser = async (id: any) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
};

export const updateUser = async (id: any, newData: { name: string }) => {
  const { data } = await axios.patch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    newData
  );
  return data;
};
