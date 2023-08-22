import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from '@refinedev/antd';
import { ICompany } from '@app/entities/Company';
import { Form, Input, Select } from 'antd';
import { IUnit } from '@app/entities/Unit';
import { ICompanyUnit } from '@app/entities/CompanyUnit';

const CompanyCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ICompany>();
  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "company",
  });

  const { queryResult } = useSelect<IUnit>({
    resource: "unit",
  });

  const unitSelectOptions = queryResult.data?.data.map((item) => ({
    label: `${item.first_name} ${item.last_name} ${item.patronymic}`,
    value: item.id,
  }));

  const { queryResult: companyUnitQueryResult } = useSelect<ICompanyUnit>({
    resource: "companyunit",
  });

  const companyUnitOptions = companyUnitQueryResult.data?.data.map((item) => {
    const unit = item.unit as IUnit
    return {
      label: `${unit.first_name} ${unit.last_name} ${unit.patronymic}`,
      value: item.id,
    }
  });

  return <Create saveButtonProps={saveButtonProps}>
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Компания"
        name="company"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          options={companySelectProps.options}
          // onChange={handleChange}
          //options={options}
        />
      </Form.Item>
      <Form.Item
        label="Персональные данные"
        name="unit"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          options={unitSelectOptions}
          // onChange={handleChange}
          //options={options}
        />
      </Form.Item>
      <Form.Item
        label="Непосредственный руководитель"
        name="parent"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Please select"
          options={companyUnitOptions}
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
  </Create>
};

export default CompanyCreate;
