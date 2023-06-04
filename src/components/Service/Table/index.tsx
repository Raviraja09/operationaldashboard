import { FC, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { TableActionTypes } from "@/types";

const inter500 = Inter({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});

const inter400 = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

interface TableProps {
  data: [];
  actions?: TableActionTypes[];
}

const Table: FC<TableProps> = ({ data, actions = [] }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<any>();
  const [accessToken, setAccessToken] = useState("");
  const fetchPost = async () => {
    try {
      const idToken = sessionStorage.getItem("tokenid");

      setAccessToken(idToken != null ? idToken :  "")
      const res = await fetch(
        `https://diet-ideas-production.up.railway.app/v1/service?search=&page=1&page_size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        console.log("Failed to fetch");
      }

      const datas = await res.json();
      data = datas.data.services;
      setUsers(datas.data.services);
      console.log(datas.data.services);
      // return data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPost();
  });

  return (
    <>
      <div className="w-full relative rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full rounded-2xl p-5 bg-white">
          <thead className="bg-white">
            <tr>
              <th className="capitalize w-56 text-xl py-5 text-center ${inter500.className}">
                Service Name
              </th>
              <th className="capitalize w-56 text-xl py-5 text-center ${inter500.className}">
                Description
              </th>
              <th className="capitalize w-56 text-xl py-5 text-center  ${inter500.className}">
                Total Number Of Days
              </th>
              <th className="capitalize w-56 text-xl py-5 text-center  ${inter500.className}">
                Data Created
              </th>
              <th className="w-20 text-xl py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: any, index: number) => (
              <tr
                key={index * 5645}
                className={`${
                  index % 2 === 0 ? "bg-background-100" : "bg-white"
                }`}
              >
                <td
                  className={`capitalize py-5 text-center ${inter500.className} `}
                  key={index * 565}
                >
                  {item.name}
                </td>
                <td
                  className={`capitalize py-5 text-center ${inter500.className} `}
                  key={index * 565}
                >
                  {item.description}
                </td>
                <td
                  className={`capitalize py-5 text-center ${inter500.className} `}
                  key={index * 565}
                >
                  {item.days}
                </td>
                <td
                  className={`capitalize py-5 text-center ${inter500.className} `}
                  key={index * 565}
                >
                  {item.createdAt}
                </td>

                <td className="flex mt-5 gap-2 h-full items-center px-5">
                  <button
                    onClick={() => {
                      actions[0].onClick(item);
                    }}
                    className={`text-white px-6 py-1 rounded-md bg-background-200 ${inter400.className}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
