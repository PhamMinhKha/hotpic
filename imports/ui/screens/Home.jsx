import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import {useTracker} from 'meteor/react-meteor-data'
import {  PostsCollection} from '../../db/PostsCollection'
export default function Home() {
    const AllPost = useTracker(()=> PostsCollection.find({}))
    console.log(AllPost);
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
