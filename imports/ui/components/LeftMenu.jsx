import React, { useContext, useState, useEffect } from 'react'
import { Menu, Button, Col } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import ConfigContext from '../ConfigContext';
const { SubMenu } = Menu;
var categories = []
export default function LeftMenu() {
    console.log('LeftMenu is running ...');
    // const [categories, setCategories] = useState([]);
    /* Sủ dụng context */
    const [config, setConfig] = useContext(ConfigContext)
    console.log('here', config);
    const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     // getAllCategories();
    //     return () => {
    //         categories
    //     }
    // }, [])
    // getAllCategories = () => {
    //     Meteor.call('categories.getall', (err, result) => {
    //         setCategories(result);
    //     });
    // }
    handleClick = e => {
        // console.log('click ', e);
    };
    toggleCollapsed = () => {
        setConfig({ ...config, left_menu_collapsed: !config.left_menu_collapsed })
    };
    return (
        <Col style={{ display: "flex", flexDirection: "column" }} xs={0}>
            {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 30, flex: 1 }} >
                {React.createElement(config.left_menu_collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                {config.left_menu_collapsed ? "Show" : "Hide"}
            </Button> */}
            <Menu
                onClick={this.handleClick}
                style={{ height: "100%" }}
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['0']}
                mode="inline"
                theme={config.theme}
            >
                {config.categories.length > 0 ? config.categories.map((value, index) => {
                    return <Menu.Item key={value._id} >
                        {value.name}
                </Menu.Item>
                }) : ""}
            </Menu>
        </Col>
    )
}
