import React, { useEffect, useState } from "react";
import { Select, Row, Button, Modal, Form, Input, InputNumber } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ModalDetail() {
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
    await axios.post('https://oms.storesend.id/gateway/user.php/BundleDetail',  data , {
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
      <Row justify="end" className="mt-3 mb-3">
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
              name={["data", "bundleId"]}
              label="bundleId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "variantId"]}
              label="variantId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "detailQty"]}
              label="detailQty"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "detailPricePlan"]}
              label="detailPricePlan"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={["data", "detailContribution"]}
              label="detailContribution"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
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

export default ModalDetail;
