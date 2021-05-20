import React, { useState, Fragment, useMemo } from 'react'
import { Switch, Card, Typography } from 'antd';
import { FileImageTwoTone, HeartTwoTone, ClockCircleTwoTone  } from '@ant-design/icons';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter, Route, Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/vi';
const { Meta } = Card;
const { Text, Title } = Typography;
const ProductItem = React.memo(function ({ children, image }) {
    moment.locale('vi');
    console.log('ProductItem is running ...');
    // console.log(image);
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);
    onChange = checked => {
        setLoading(!checked);
        // alert();
    };
    return (
        <div>
            {/* <Switch checked={!loading} onChange={(e) => onChange(e)} /> */}
            <Link to={"/detail/"+image['_id']} >
                <Card
                    className="shadow_box"
                    style={{ width: "100%", marginTop: 16 }}
                    bodyStyle={{ padding: 5 }}
                    hoverable
                    cover={<img alt="example" src={children} style={{ display: loading ? "none" : "flex" }}  />}
                >
                    <Skeleton height={300} style={{ display: loading ? "flex" : "none", marginTop: 10 }} />
                    <Skeleton count={2} height={30} style={{ display: loading ? "flex" : "none", marginTop: 10 }} />
                    <div style={{ display: loading ? "none" : "block" }}>

                        <Title level={4}>{image['title']}</Title>
                        <div style={{ flex: 1, flexDirection: "row", display:"flex", justifyContent:"space-between" }}>
                            <div style={{ flex: 1 }}>
                                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20, }} />
                                <Text type="secondary" style={{  fontSize: 20 }}> {image['like']}</Text>
                            </div>
                            <div style={{ flex: 1 }}>
                                <FileImageTwoTone twoToneColor="#eb2f96" style={{ }} />
                                <Text type="secondary" style={{ fontSize: 20 }}> {image['images'].length}</Text>
                            </div>
                            <div style={{ flex: 2, textAlign:"right" }}>
                                <ClockCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20, }} />
                                <Text type="secondary" style={{  fontSize: 20 }}> {moment(image['createAt']).fromNow()}</Text>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </div>
    );
});
export default ProductItem;
