import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
export default function Home() {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>Content</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}
