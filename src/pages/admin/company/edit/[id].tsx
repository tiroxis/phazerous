import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { ICompany } from '@app/entities/Company';
import { Edit, useForm } from '@refinedev/antd';
import {
  Form,
  Input, Select,
} from 'antd';

const { TextArea } = Input;

const CompanyEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<ICompany>();

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
        <Form.Item
          label="Должностные лица"
          name="units"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            // onChange={handleChange}
            //options={options}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};


export default CompanyEdit;
