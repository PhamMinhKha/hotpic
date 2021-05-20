import React, { useEffect } from 'react'
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
import { useTracker } from 'meteor/react-meteor-data'
import { PostsCollection } from '../../db/PostsCollection'
import { TaskCollection } from '../../db/TaskCollection';
var pageId = 1;
const list1 = []
const list2 = []
const list3 = []
const list4 = []
export default function ListIProctItem() {


    AllPost = useTracker(() => {
        Meteor.subscribe('posts');
        return PostsCollection.find({}, { sort: { cover_uid: -1 } }).fetch();
    })
    useEffect(() => {
        ListProduct()
    }, [AllPost])
    // Meteor.subscribe('posts');
    // AllPost = PostsCollection.find({}).fetch();
    // console.log('this->', AllPost);
    ListProduct = () => {

        let dem = 1;
        AllPost.map((value, index) => {
            // console.log(value)
            if (dem / 1 === 1) {
                dem++;
                list1.push(value);
            } else if (dem / 2 === 1) {
                dem++;
                list2.push(value);
            } else if (dem / 3 === 1) {
                dem++;
                list3.push(value);
            } else if (dem / 4 === 1) {
                list4.push(value);
                dem = 1
            }
        })

    }
    RenderColumnImages = (listImages) => {
        let jsx = [];
        jsx.push(listImages.map((value, index) => {
            cover_image = value['images'].filter(image => image.meta.uid === value['cover_uid']);
            return <ProductItem image={value} key={index}>{cover_image[0]['source']}</ProductItem>
        }))
        return jsx
    }
    return (
        <>
            <Row gutter={50} style={{ flexDirection: "row" }}>
                <Col className="gutter-row" span={4} xs={24} sm={12} md={6} lg={6} xl={6} key={1}>
                    {RenderColumnImages(list1)}
                </Col>
                <Col className="gutter-row" span={4} xs={24} sm={12} md={6} lg={6} xl={6} key={2}>
                    {RenderColumnImages(list2)}
                </Col>
                <Col className="gutter-row" span={4} xs={24} sm={12} md={6} lg={6} xl={6} key={3}>
                    {RenderColumnImages(list3)}
                </Col>
                <Col className="gutter-row" span={4} xs={24} sm={12} md={6} lg={6} xl={6} key={4}>
                    {RenderColumnImages(list4)}
                </Col>
            </Row>
        </>
    )
}
