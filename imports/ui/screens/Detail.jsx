import React from 'react'
import { Image, Button, Space, Layout, Typography, Row, Col } from 'antd';
import { HeartTwoTone, EyeTwoTone, FileImageTwoTone } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;
import { useTranslation } from 'react-i18next';
import ImageInDetail from '../components/ImageInDetail';
const listImage = [
    "/images/poster.jpeg",
    "/images/poster2.jpeg",
    "/images/poster3.jpg",
    "/images/poster4.jpeg",
    "/images/poster6.jpeg",
]
export default function Detail() {
    const [random, setRandom] = React.useState();
    /* Đa ngôn ngữ */
    const { t, i18n } = useTranslation();
    return (
        <Layout>
            <Content>
                <Row gutter={16}>
                    <Col span={4} xs={12} sm={12} md={8} lg={4} xl={4}>
                        <Image src={'/images/poster.jpeg'} style={{ maxHeight: 400, flex: 1, justifySelf: "center", alignSelf: "center" }} />
                    </Col>
                    <Col span={20} style={{ flexDirection: "row" }} xs={12} sm={12} md={16} lg={20} xl={20}>
                        <Title level={1}>Tựa Đề Mới</Title>
                        <Text type="secondary">{t('detail_page.upload_date')}: 2021-2-21</Text>
                        <p>
                            <Text type="secondary">{t('detail_page.category')}: commerdi, hony, funny</Text>
                        </p>
                        <p>
                            <Text type="secondary">{t('detail_page.description')}: Ngọc Chiêu Lệnh kể về Thương Trụ vô đạo, Cơ Vũ thay thế. Dưới đài Phong Thần, Khương Tử Nha đã nhường thần vị, cam nguyện làm công hầu dưới nhân gian, bảo vệ nghĩa nữ Đoan Mộc Thúy trở thành tiên. Thoắt cái đã ngàn năm, thiên hạ là của Đại Tống. Vì danh tiếng “thẩm vấn cả âm dương” của Bao Thanh Thiên, Đoan Mộc Thúy hạ phàm lập nên môn phái “Tế Hoa Lưu”, Tứ phẩm Đới đao Hộ vệ Triển Chiêu phụng lệnh Bao Chửng, “bù trừ lẫn nhau” với Đoan Mộc Thúy, trải qua vài phen đồng sinh cộng tử thì lặng lẽ nảy sinh tình cảm.

</Text>
                        </p>
                        <div style={{ justifyContent: "flex-start", display: "flex" }}>
                            <div>
                                <HeartTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon">50</Text>
                            </div>
                            <div style={{marginLeft:10}}>
                                <EyeTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon">50</Text>
                            </div>
                            <div style={{marginLeft:10}}>
                                <FileImageTwoTone style={{ fontSize: 30 }} twoToneColor="#eb2f96" /> <Text className="text_icon">6</Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer>
                <Row gutter={16}>
                    <Image.PreviewGroup>
                        {listImage.map((value, index) => {
                            return (
                                <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                                    <ImageInDetail>{value}</ImageInDetail>
                                </Col>
                            )
                        })}
                    </Image.PreviewGroup>
                </Row>
            </Footer>
        </Layout>
    );
}
