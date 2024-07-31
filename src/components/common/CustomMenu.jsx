import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Divider, Button } from "antd";
import { logout } from "../../utils/auth";
import AuthContext from "../../context/AuthProvider";

import styles from "../../css/components/common/CustomMenu.module.css";

const CustomMenu = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const logoutFunc = async () => {
    const response = await logout();
    setAuth({});
    navigate("/login");
    console.log(response);
  };

  return (
    <div>
      <MenuOutlined
        onClick={() => setOpen(true)}
        className={styles.menu_icon}
      />
      <Drawer onClose={() => setOpen(false)} open={open}>
        <Button
          style={{ color: "black" }}
          type="link"
          onClick={() => goTo("/my_page")}
        >
          My page
        </Button>
        <Divider orientation="left">Admin</Divider>
        <p>Some content...</p>
        <Divider />
        <Button
          htmlType="submit"
          style={{
            backgroundColor: "#6fb3b8",
            width: "90px",
            color: " #f6f6f2",
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => logoutFunc()}
          style={{
            backgroundColor: "#6fb3b8",
            width: "90px",
            color: " #f6f6f2",
          }}
        >
          Logout
        </Button>
      </Drawer>
    </div>
  );
};

export default CustomMenu;
