import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from '@refinedev/antd';
import {
  Form,
  Input, Select,
} from 'antd';
import { IUnit } from '@app/entities/Unit';
import { ICompany } from '@app/entities/Company';
import { ICompanyUnit } from '@app/entities/CompanyUnit';


const CompanyEdit: React.FC<IResourceComponentsProps> = () => {

  const { formProps, saveButtonProps, queryResult } = useForm<IUnit>();

  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "company",
  });

  const { queryResult: unitQueryResult } = useSelect<IUnit>({
    resource: "unit",
  });

  const unitSelectOptions = unitQueryResult.data?.data.map((item) => ({
    label: `${item.first_name} ${item.last_name} ${item.patronymic}`,
    value: item.id,
  }));

  const { queryResult: companyQueryResult } = useSelect<ICompanyUnit>({
    resource: "companyunit",
  });

  const companyunitSelectOptions = companyQueryResult.data?.data.map((item) => {
    const unit = item.unit as IUnit
    return {
      label: `${unit.first_name} ${unit.last_name} ${unit.patronymic}`,
      value: item.id,
    }
  });

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
          label="Компания"
          name="company"
          valuePropName={"company.id"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder="Please select"
            value={formProps.initialValues?.company?.id}
            options={companySelectProps.options}

            // onChange={handleChange}
            //options={options}
          />
        </Form.Item>
        <Form.Item
          label="Персональные данные"
          name="unit"
          valuePropName={"unit.id"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder="Please select"
            value={formProps.initialValues?.unit?.id}
            options={unitSelectOptions}
          />
        </Form.Item>
        <Form.Item
          label="Непосредственный руководитель"
          name="parent"
          valuePropName={"__parent__.unit.id"}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder="Please select"
            value={formProps.initialValues?.__parent__?.unit?.id}
            options={companyunitSelectOptions}
            // onChange={handleChange}
            //options={options}
          />
        </Form.Item>
        <Form.Item
          label="Должность"
          name="position"
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
