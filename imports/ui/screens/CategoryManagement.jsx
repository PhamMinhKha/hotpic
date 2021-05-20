import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Form, Input, Button, Select, Row, message } from 'antd';
import { useTracker } from 'meteor/react-meteor-data'
import { PostsCollection } from '../../db/PostsCollection'
import { useTranslation } from 'react-i18next';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export default function CategoryManagement() {
    /* Đa ngôn ngữ */
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        let t = Meteor.call("categories.insert", values, function (error, result) {
            if (error) {
                message.error('error:' + error);
            } else {
                //success
                form.resetFields();
                console.log(result);
            }
        });
    };
    return (
        <Row>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ background: "#fff", padding: 10, flex: 1 }}>
                <Form.Item name="name" label={t("admin_tools.category_name")} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="icon" label={t("admin_tools.category_icon")}>
                    <Input />
                </Form.Item>
                <Form.Item name="introduction" label={t("admin_tools.introduction_to_the_category")}>
                    <Input />
                </Form.Item>
                <Form.Item name="keyword" label={t("admin_tools.category_keyword")}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    {t("admin_tools.submit")}
        </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}
