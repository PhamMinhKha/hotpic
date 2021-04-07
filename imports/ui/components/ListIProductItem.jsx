import React from 'react'
import ProductItem from './ProductItem'
import { Row, Col } from 'antd';
const listImage = [
    "/images/poster.jpeg",
    "/images/poster.jpeg",
    "/images/poster.jpeg",
    "/images/poster2.jpeg",
    "/images/poster3.jpg",
    "/images/poster4.jpeg",
    "/images/poster6.jpeg",
]
export default function ListIProctItem() {
    return (
        <Row gutter={10}>
            {listImage.map((value, index) => {
                // console.log(value)
                return (
                <Col className="gutter-row" span={4} xs={24} sm={12} md={6} lg={6} xl={6} key={index}>
                    <ProductItem>{value}</ProductItem>
                </Col>
                )
            })}
        </Row>
    )
}
