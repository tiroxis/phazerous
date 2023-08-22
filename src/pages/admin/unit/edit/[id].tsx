import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from '@refinedev/antd';
import {
  Form,
  Input,
} from 'antd';
import { IUnit } from '@app/entities/Unit';


const CompanyEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IUnit>();

  return (
    <Edit
      isLoading={queryResult?.isFetching}
      saveButtonProps={saveButtonProps}
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
        }}
      >
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
    </Edit>
  );
};


export default CompanyEdit;
