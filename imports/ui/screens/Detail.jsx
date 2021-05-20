import React, { useState, useEffect } from 'react'
import { Image, Button, Space, Layout, Typography, Row, Col, message } from 'antd';
import { HeartTwoTone, EyeTwoTone, FileImageTwoTone } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;
import { useTranslation } from 'react-i18next';
import ImageInDetail from '../components/ImageInDetail';
import { useTracker } from 'meteor/react-meteor-data'
import { PostsCollection } from '../../db/PostsCollection'
import moment from 'moment';
import 'moment/locale/vi';
import {
    useParams
} from "react-router-dom";
const listImage = [

]
export default function Detail() {
    console.log('Detail is running ...')
    /*
        Lấy thông tin của post theo id
    */
    let { id } = useParams();
    console.log(id)
    const { post, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('posts');
        if (!handler.ready()) {
            return { post: [] ,isLoading: true };
          }
        const post = PostsCollection.find({ _id: id }).fetch()[0];
        return {post, isLoading: false}
    })
    console.log(post);
    /* Đa ngôn ngữ */
    const { t, i18n } = useTranslation();
    return (
        <Layout>
            {isLoading && <div className="loading">loading...</div>}
            <Row gutter={16} align="middle" justify="center" style={{flexDirection:"column"}}>
                <Image.PreviewGroup>
                    {post.images ? post.images.map((value, index) => {
                        return (
                            <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                                <ImageInDetail>{value['source']}</ImageInDetail>
                            </Col>
                        )
                    }) : <></>}
                </Image.PreviewGroup>
            </Row>
                <Content>

                    <Row gutter={16}>
                        <Col span={4} xs={12} sm={12} md={8} lg={4} xl={4}>
                            <Image src={'/images/poster.jpeg'} style={{ maxHeight: 400, flex: 1, justifySelf: "center", alignSelf: "center" }} />
                        </Col>
                        <Col span={20} style={{ flexDirection: "row" }} xs={12} sm={12} md={16} lg={20} xl={20}>
                            <Title level={1}>{post['title']}</Title>
                            <Text type="secondary">{t('detail_page.upload_date')}: {moment(post['createAt']).fromNow()}</Text>
                            <p>
                                <Text type="secondary">{t('detail_page.category')}: {post['category']}</Text>
                            </p>
                            <p>
                                <Text type="secondary">{t('detail_page.description')}:  {post['description']}</Text>
                            </p>
                            <div style={{ justifyContent: "flex-start", display: "flex" }}>
                                <div>
                                    <HeartTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon"> {post['like']}</Text>
                                </div>
                                <div style={{ marginLeft: 10 }}>
                                    <EyeTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon">50</Text>
                                </div>
                                <div style={{ marginLeft: 10 }}>
                                    <FileImageTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon">{post.images ? post.images.length : 0}</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>

        </Layout>
    );
}
