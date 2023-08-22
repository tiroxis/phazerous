import { AuthPage } from "@refinedev/antd";

const Login: () => JSX.Element = () => {
  return (
      <AuthPage
        type="login"
        title={'Авторизация'}

        formProps={{
          initialValues: {
            email: "admin@refine.dev",
            password: "password",
          },
        }}
      />
  );
};

export default Login;
