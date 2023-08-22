import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  DateField,
  TextField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;
// import { AntdShowInferencer } from '@refinedev/inferencer/antd';

const CompanyShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} />
      <Title level={5}>Компания</Title>
      <>{record?.company?.title}</>
      <Title level={5}>Персональные данные</Title>
      <>{record?.unit?.first_name} {record?.unit?.last_name} {record?.unit?.patronymic}</>
      <Title level={5}>Руководитель</Title>
      <>{record?.__parent__?.unit?.first_name} {record?.__parent__?.unit?.last_name} {record?.__parent__?.unit?.patronymic}</>
      <Title level={5}>Должность</Title>
      <TextField value={record?.position} />
    </Show>
  );
  //return <AntdShowInferencer></AntdShowInferencer>
};

export default CompanyShow;
