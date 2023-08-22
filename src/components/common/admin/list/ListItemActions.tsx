import { EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Space } from 'antd';
import { useCallback } from 'react';
import { useDelete, useNavigation } from '@refinedev/core';


export const ListItemActions = ({record, entityType}) => {
  const { show, edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();

  const goToEditAction = useCallback(() => {
    edit(entityType, record.id)
  }, [edit, entityType, record.id])

  const goToViewAction = useCallback(() => {
    show(entityType, record.id)
  }, [entityType, record.id, show])

  const deleteAction = useCallback(() => {
    mutateDelete({
      resource: entityType,
      id: record.id,
      mutationMode: "undoable",
    });
  }, [entityType, mutateDelete, record.id])

  return (
    <Space align="end">
      <EditButton hideText={true} onClick={goToEditAction}/>
      <ShowButton hideText={true} onClick={goToViewAction}/>
      <DeleteButton hideText={true} onClick={deleteAction}/>
    </Space>
  )
}
