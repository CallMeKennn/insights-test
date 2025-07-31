"use client";

import React from "react";
import UserList from "@/components/Question1-2";
import ModalComponent from "@/components/ModalComponent";
import { useState } from "react";
import { X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Hoàng", email: "huyhoang13199@gmail.com" },
  { id: 2, name: "Dũng", email: "huyhoang13199@gmail.com" },
  { id: 3, name: "Vanh", email: "huyhoang13199@gmail.com" },
];

const page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <UserList users={users} />
      <button type="button" onClick={() => setIsOpen(true)}>
        Mở modal
      </button>
      <ModalComponent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        buttonClose={<X />}
        title="Đây là title của modal này"
        hasSave={true}
        hasCanncel={true}
        onSave={() => {
          console.log("Save function");
        }}
        onCanncel={() => {
          console.log("Canncel function");
        }}
      >
        <div>Hello đây là nội dung trong modal</div>
      </ModalComponent>
    </div>
  );
};

export default page;
