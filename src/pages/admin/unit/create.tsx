import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from '@refinedev/antd';
import { ICompany } from '@app/entities/Company';
import { Form, Input } from "antd";

const CompanyCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ICompany>();

  return <Create saveButtonProps={saveButtonProps}>
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Фамилия"
        name="last_name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="first_name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Отчество"
        name="patronymic"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  </Create>
};

export default CompanyCreate;
