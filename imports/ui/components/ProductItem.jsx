import React, { useState, Fragment } from 'react'
import { Switch, Card, Typography } from 'antd';
import { FileImageTwoTone, HeartTwoTone } from '@ant-design/icons';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter, Route, Link } from "react-router-dom";

const { Meta } = Card;
const { Text, Title } = Typography;
export default function ProductItem({ children }) {
    // console.log(children)
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);
    onChange = checked => {
        setLoading(!checked);
        // alert();
    };
    // console.log(focus);
    return (
        <>
            {/* <Switch checked={!loading} onChange={(e) => onChange(e)} /> */}
            <Link to="/detail">
                <Card
                    style={{ width: "100%", marginTop: 16 }}
                    bodyStyle={{ padding: 5 }}
                    hoverable
                    cover={<img alt="example" src={children} style={{ display: loading ? "none" : "flex" }} />}
                >
                    <Skeleton height={300} style={{ display: loading ? "flex" : "none", marginTop: 10 }} />
                    <Skeleton count={2} height={30} style={{ display: loading ? "flex" : "none", marginTop: 10 }} />
                    <div style={{ display: loading ? "none" : "block" }}>

                        <Title level={4}>Người mẫu số 21</Title>
                        <div style={{ flex: 1, }}>
                            <div style={{ flex: 1, float: "left" }}>
                                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20, flex: 1 }} />
                                <Text type="secondary" style={{ flex: 1, fontSize: 20 }}> 50</Text>
                            </div>
                            <div style={{ flex: 1, float: "right" }}>
                                <FileImageTwoTone twoToneColor="#eb2f96" style={{ flex: 1 }} />
                                <Text type="secondary" style={{ flex: 1, fontSize: 20 }}> 12</Text>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </>
    );
}
