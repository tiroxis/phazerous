import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

import "@refinedev/antd/dist/reset.css";
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { notificationProvider, ThemedLayoutV2 } from '@refinedev/antd';
import { Refine } from '@refinedev/core';
import { ComponentProps } from 'react';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const AdminLayout: React.FC<ComponentProps<any>> = ({children}) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("/api")}
          notificationProvider={notificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          resources={[
            {
              name: "company",
              list: "/admin/company/list",
              show: "/admin/company/show/:id",
              create: "/admin/company/create",
              edit: "/admin/company/edit/:id",
              meta: { canDelete: true, label: 'Компания' },
            },
            {
              name: "unit",
              list: "/admin/unit/list",
              show: "/admin/unit/show/:id",
              create: "/admin/unit/create",
              edit: "/admin/unit/edit/:id",
              meta: { canDelete: true, label: 'Персональные данные' },
            },
            {
              name: "companyunit",
              list: "/admin/companyunit/list",
              show: "/admin/companyunit/show/:id",
              create: "/admin/companyunit/create",
              edit: "/admin/companyunit/edit/:id",
              meta: { canDelete: true, label: 'Должностные лица' },
            },
          ]}
        >
          <ThemedLayoutV2>
          {children}
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
          </ThemedLayoutV2>
        </Refine>
      </QueryClientProvider>
    </>

  )
}

export default AdminLayout;
