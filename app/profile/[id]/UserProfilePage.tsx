"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateUser } from "@/fetchData";
import { useState } from "react";
import { useParams } from "next/navigation";

const UserProfilePage = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();

  const params = useParams();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUser(params.id),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      updateUser(params.id, { name: name });
    },
    onMutate: async (newName: any) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const prevUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old: any) => ({
        ...old,
        name: newName.name,
      }));

      return { prevUser };
    },
    onError: (err, variables, context) => {
      alert("Đã gặp một lỗi nào đó, xin vui lòng thử lại sau");
      if (context?.prevUser) {
        queryClient.setQueryData(["user"], context.prevUser);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

      <div>
        <label className="font-medium block mb-1">Name:</label>
        <input
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => mutation.mutate({ ...user, name })}
        >
          Save
        </button>
      </div>

      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Phone:</strong> {user.phone}
      </div>
      <div>
        <strong>Website:</strong> {user.website}
      </div>

      <div>
        <strong>Address:</strong>
        <p>
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
        <p>
          Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
        </p>
      </div>

      <div>
        <strong>Company:</strong>
        <p>{user.company.name}</p>
        <p>{user.company.catchPhrase}</p>
        <p>{user.company.bs}</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
