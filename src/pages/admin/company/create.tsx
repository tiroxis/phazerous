import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from '@refinedev/antd';
import { ICompany } from '@app/entities/Company';
import { Form, Input } from "antd";

const { TextArea } = Input;
const CompanyCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ICompany>();

  return <Create saveButtonProps={saveButtonProps}>
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Название"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  </Create>
};

export default CompanyCreate;
