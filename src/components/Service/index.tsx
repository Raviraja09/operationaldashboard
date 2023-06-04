import { FC, useState } from "react";
import { Inter } from "next/font/google";
import { ServicesData } from "@/assets/data";
import Table from "./Table";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import Form from "./Form";

const inter500 = Inter({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});
const inter600 = Inter({
  subsets: ["latin"],
  weight: "600",
  style: "normal",
});

const inter400 = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const ServiceMain: FC = () => {
  const [newClients, setNewClients] = useState<unknown[]>(ServicesData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [assignId, setAssignId] = useState<number>();
  const [newClient, setNewClient] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [editItem, setEditItem] = useState<any>();

  return (
    <div className="p-10 pb-20 relative flex flex-col pt-20 gap-16">
      {newClient && (
        <div className="absolute top-0 z-50 left-0 w-full h-screen bg-[#000] bg-opacity-50 flex items-center justify-center">
          <Form title="Add New Service" setCancel={setNewClient} />
        </div>
      )}

      {editItem && (
        <div className="absolute top-0 z-50 left-0 w-full h-screen bg-[#000] bg-opacity-50 flex items-center justify-center">
          <Form title="Edit Service" setCancel={setEditItem} data={editItem} />
        </div>
      )}

      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full px-5">
          <h1 className={`${inter500.className} text-2xl my-2 text-black`}>
            Service Programme
          </h1>
          <button
            onClick={() => setNewClient(true)}
            className="bg-background-200 text-white rounded-md px-4 py-2"
          >
            ADD NEW
          </button>
        </div>
        <Table
          data={data}
          actions={[
            {
              name: "Edit",
              onClick: (item: any) => {
                setEditItem(item);
              },
              bgColor: "bg-background-200",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ServiceMain;
