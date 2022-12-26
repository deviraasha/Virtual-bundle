import React from "react";
import { useState } from "react";
import axios, { AxiosHeaders } from "axios";
import { useEffect } from "react";
import { Table, Space, Collapse, Button, List, Avatar } from "antd";
import ModalPage from "../Modal";
import ModalDetail from "./ModalDetail";
const { Panel } = Collapse;

function TableList() {
  const [datas, setDatas] = useState();
  const [dataProduct, setDataProduct] = useState();
  const [page, setPage] = useState(1);

  const getDataTable = async () => {
    const dataList = await axios.get(
      `https://oms.storesend.id/gateway/user.php/Bundles?page=${page}`,
      {
        headers: {
          accessToken:
            "Mxx0ZENOZVoxbEptdlVUenFvU3NnSmVWVlJBVUUwbVppVXwyMDIyLTExLTAxIDAzOjMxOjM0",
          "Access-Control-Allow-Origin": "*",
          clientId: "1",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    setDatas(dataList.data);
  };

  useEffect(() => {
    getDataTable();
    getProducts();
  }, []);

  const getProducts = async () => {
    const listProduct = await axios.get(
      `https://oms.storesend.id/gateway/user.php/Products?page=1`,
      {
        headers: {
          accessToken:
            "Mxx0ZENOZVoxbEptdlVUenFvU3NnSmVWVlJBVUUwbVppVXwyMDIyLTExLTAxIDAzOjMxOjM0",
          "Access-Control-Allow-Origin": "*",
          clientId: "1",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    setDataProduct(listProduct.data);
  };

  const column = [
    Table.EXPAND_COLUMN,
    {
      title: "Name",
      dataIndex: "bundleName",
      key: "bundleName",
    },
    {
      title: "Description",
      dataIndex: "bundleDescription",
      key: "bundleDescription",
    },
    {
      title: "Price",
      dataIndex: "bundleRrp",
      key: "bundleRrp",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button className="me-4">Edit</Button>
          <Button onClick={handleDelete(record._id) }>Delete</Button>
        </>

        // <Space size="middle">
        //   <ModalPage />
        // </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await axios.delete( `https://oms.storesend.id/gateway/user.php/Bundle/${id}`)
    .then((res)=> console.log(res))
    .catch((error)=> "")
console.log('ini',id)
  }
  return (
    <div>
      <Table
        columns={column}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <div
                style={{
                  height: 400,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                  backgroundColor: "#ffff",
                }}
              >
                <h1>List Product</h1>
                <List
                  dataSource={dataProduct}
                  renderItem={(item) => (
                    <List.Item key={item.brandId}>
                      <List.Item.Meta
                        title={
                          <a href="https://ant.design">{item.productName}</a>
                        }
                        description={item.productDescription}
                      />
                    </List.Item>
                  )}
                />
              </div>
              <ModalDetail/>
              <List
              className="bg-white"
                dataSource={record.details}
                renderItem={(item) => (
                  <List.Item key={item.detailPricePlan}>
                    <List.Item.Meta
                      title={
                        <a href="https://ant.design">
                          {item.variant.variantName}
                        </a>
                      }
                      description={item.variant.variantName}
                    />
                    <div>
                      <Button className="me-3">Edit Detail</Button>
                      <Button>Delete Detail</Button>
                    </div>
                  </List.Item>
                )}
              />
              {/* {record.details.map((items, i)=> {
                console.log('apaan:',items)
                return(<div key={i}>
                    <List
                </div>)
             })} */}
            </>
          ),
          rowExpandable: (record) => record.bundleDescription !== "sfsd",
        }}
        dataSource={datas}
      />
    </div>
  );
}

export default TableList;
