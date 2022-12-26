import React, { useEffect, useState } from "react";
import { Select, Row, Button, Modal, Form, Input, InputNumber } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reqBody, setReqBody] = useState()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }
  const onFinish = async (values) => {
    const data = values.data
    console.log(data)
    await axios.post('https://oms.storesend.id/gateway/user.php/Bundle ',  data , {
        headers: {
            accessToken:
            "Mxx0ZENOZVoxbEptdlVUenFvU3NnSmVWVlJBVUUwbVppVXwyMDIyLTExLTAxIDAzOjMxOjM0",
          // 'accept': 'application/json',
          "Access-Control-Allow-Origin": "*",
          clientId: "1",
          "Access-Control-Allow-Headers": "*",
        }
      })
    // .then((res)=> {
    //     res
    // })
    //   console.log("ini isi: ", res);
    // setReqBody(values.data)
  };

  const onSubmit = () => {
    console.log(reqBody)
  }
  useEffect(()=> {}, [reqBody])
  return (
    <>
      <Row justify="end">
        <Button type="primary" onClick={showModal}>
          Add Bundle
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["data", "categoryId"]}
              label="Category Id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "brandId"]}
              label="Brand Id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "bundleName"]}
              label="Bundle Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["data", "bundleSkuNo"]}
              label="Bundle Sku No"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["data", "bundleRrp"]}
              label="Bundle Rrp"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name={["data", "bundleDescription"]}
              label="Bundle Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={["data", "status"]}
              label="Status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value="active">Aktif</Select.Option>
                <Select.Option value="unactive">Tidak Aktif</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
}

export default ModalPage;
