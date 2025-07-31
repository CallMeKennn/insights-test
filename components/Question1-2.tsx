"use client";

import React from "react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<User>();

  return (
    <div>
      <h2>Users</h2>
      {users.map((user: User) => (
        <div key={user.id} onClick={() => setSelectedUser(user)}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}

      {selectedUser && (
        <div>
          <h3>Selected: {selectedUser.name}</h3>
        </div>
      )}
    </div>
  );
}

export default UserList;
