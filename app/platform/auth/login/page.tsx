import React from "react";
import { Button, Input, Spacer, Text, Divider, Card } from "@nextui-org/react";
import { GoogleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <Card>
      <Text h3>Login</Text>
      <Input
        fullWidth
        isClearable
        placeholder=""
        value={" "}
        variant="bordered"
        onValueChange={() => {}}
      />
      <Spacer y={1} />
      <Input />
      <Spacer y={1} />
      <Button auto shadow color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Spacer y={1} />
      <Divider />
      <Spacer y={1} />
      <Button
        auto
        shadow
        color="secondary"
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
    </Card>
  );
};

export default LoginPage;
