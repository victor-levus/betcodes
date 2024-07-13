import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import UserTable from "./UserTable";
import Pagination from "../../../components/Pagination";
import { fetchUsers, selectAllUsers } from "../../../store/slices/userSlice";

const UsersPage = ({ searchParams }) => {
  const dispatch = useDispatch();
  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 7;
  const users = useSelector(selectAllUsers);
  const usersData = _.orderBy(users, ["match_time"], ["desc"]);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("running");
  }, []);

  // const usersData = await prisma.user.findMany({
  //   orderBy: { createdAt: "desc" },
  //   skip: (page - 1) * pageSize,
  //   take: pageSize,
  // });

  const userCount = usersData.length;
  // const userCount = await prisma.user.count();

  console.log(users);
  return (
    <div>
      <UserTable usersData={usersData} title="List of Users" />
      <Pagination
        pageSize={pageSize}
        itemCount={userCount}
        currentPage={page}
      />
    </div>
  );
};

export const metadata = {
  title: "BetCodes - Lists of users",
  description: "We provide betting tips that has high possibility of happening",
};

export default UsersPage;
