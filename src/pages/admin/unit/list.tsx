import React, { FC } from 'react'
import { IResourceComponentsProps } from '@refinedev/core';
import { Company } from '@app/entities/Company';
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";
import { ListItemActions } from '@app/components/common/admin/list/ListItemActions';
const CompanyList: FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<Company>({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="last_name" title="Фамилия" />
        <Table.Column dataIndex="first_name" title="Имя" />
        <Table.Column dataIndex="patronymic" title="Отчество" />
        <Table.Column
          dataIndex="createdAt"
          title="Дата создания"
          render={(_value) => new Date(_value).toISOString()}
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Дата обновления"
          render={(_value) => new Date(_value).toISOString()}
        />

        <Table.Column<Company>
          fixed="right"
          title="Действия"
          dataIndex="actions"
          key="actions"
          align="center"
          render={(_value, record) => (
            <ListItemActions record={record} entityType="unit" />
          )}
        />
      </Table>
    </List>
  );
}

export default CompanyList;
