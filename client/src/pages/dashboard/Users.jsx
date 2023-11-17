/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ComponentLoading, Table } from "../../components";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setUsers } from "../../features/user/userSlice";
import {
  useGetUsersQuery,
} from "../../features/user/userApiSlice";
import { Avatar as MuiAvatar } from "@mui/material";

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  const dispatch = useDispatch();
  const updatedData = data?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUsers(data));
    }
  }, [isLoading]);

  const cols = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "left",
      minWidth: 250,
      renderCell: ({ row: { name, profilePicture } }) => {
        return (
          <div className="flex gap-2 items-center">
            <MuiAvatar
              alt={name}
              src={profilePicture}
              sx={{ width: 36, height: 36 }}
              className="border-2 border-primary"
            />
            {name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "left",
      minWidth: 280,
    },
    {
      field: "roles",
      headerName: "Role",
      headerAlign: "center",
      minWidth: 300,
      renderCell: ({ row: { roles } }) => {
        return (
          <div
            className={
              "rounded text-sm py-1 px-3 mx-auto w-[40%] shadow-none bg-gray-200 text-gray-700 flex items-center gap-2 justify-evenly"
            }
          >
            {roles?.hasOwnProperty("Admin") ? (
              <MdAdminPanelSettings />
            ) : roles?.hasOwnProperty("ProUser") ? (
              <RiAdminFill />
            ) : (
              <BiSolidUser />
            )}
            {roles?.hasOwnProperty("Admin")
              ? "Admin"
              : "Pro User"}
          </div>
        );
      },
    },
  ];

  return (
    <section className="mx-auto px-6 flex justify-center items-center h-[100vh]">
      <div className="w-full h-[90%] flex justify-center items-center">
        {isLoading ? (
          <ComponentLoading />
        ) : (
          <Table
            rows={updatedData}
            cols={cols}
          />
        )}
      </div>
    </section>
  );
};

export default Users;
