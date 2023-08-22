import React, { FC } from 'react'
import { IResourceComponentsProps } from '@refinedev/core';
import { Company } from '@app/entities/Company';
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";
import { ListItemActions } from '@app/components/common/admin/list/ListItemActions';
import { CompanyUnit } from '@app/entities/CompanyUnit';
const CompanyList: FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<CompanyUnit>({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="company" title="Компания" render={(_value) =>_value?.title} />
        <Table.Column dataIndex="__parent__" title="Непосредственный руководитель"
          render={(_value) => _value && _value.unit ? `${_value?.unit.first_name} ${_value?.unit.last_name} ${_value?.unit.patronymic}` : ''}
        />
        <Table.Column dataIndex="unit" title="Персональные данные"
            render={(_value) => _value ? `${_value?.first_name} ${_value?.last_name} ${_value?.patronymic}` : ''}
        />
        <Table.Column dataIndex="position" title="Должность" />
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
            <ListItemActions record={record} entityType="companyunit" />
          )}
        />
      </Table>
    </List>
  );
}

export default CompanyList;
