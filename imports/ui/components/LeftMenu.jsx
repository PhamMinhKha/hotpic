import React, { useContext, useState } from 'react'
import { Menu, Button } from 'antd';
import { AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined, } from '@ant-design/icons';
import ConfigContext from '../ConfigContext';
const { SubMenu } = Menu;
export default function LeftMenu() {

    /* Sủ dụng context */
    const [config, setConfig] = useContext(ConfigContext)
    handleClick = e => {
        // console.log('click ', e);
    };
    toggleCollapsed = () => {
        setConfig({...config, left_menu_collapsed: !config.left_menu_collapsed})
    };
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 30, flex:1 }} >
                {React.createElement(config.left_menu_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                {config.left_menu_collapsed ? "Show" : "Hide"}
            </Button>
            <Menu
                onClick={this.handleClick}
                style={{ height: "100%" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme={config.theme}
            >
                <Menu.Item key="1" >
                    Option 1
          </Menu.Item>
                <Menu.Item key="2" >
                    Option 2
          </Menu.Item>
                <Menu.Item key="3" >
                    Option 3
          </Menu.Item>
            </Menu>
        </div>
    )
}
