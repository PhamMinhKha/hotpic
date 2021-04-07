import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Link, Typography, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation, useHistory } from 'react-router-dom';
import i18next from 'i18next';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Text } = Typography;
export default function Register() {
    let location = useLocation();
    let history = useHistory();
    const user = useTracker(() => Meteor.user());
    /* Đa ngôn ngữ */
    const { t, i18n } = useTranslation();
    const [register, setRegister] = useState(location.pathname === "/register" ? true : false);
    const [alert, setAlert] = useState("");
    const onFinishRegister = (values) => {
        console.log('Success:', values);
        let id_user = Meteor.call('users.Insert', values, function (err) {
            if (err) {
                switch (err.error) {
                    case 403: setAlert(t('register_page.email_already_exists')); break;
                    default: setAlert(err.reason); break;
                }
            }
            else {

            }
        });
    };
    const onFinish = (values) => {
        Meteor.loginWithPassword(values.email, values.password, function (error) {
            console.log(error)
            if (error) {
                setAlert(t("register_page.wrong_email_or_password"))
            }
            else {
                console.log("success login");
                history.push("/");
            }
        });
        //    console.log(user);
    };
    const validateMessages = {
        required: '${label} ' + t('register_page.is_required'),
        types: {
            email: '${label} ' + t('register_page.is_not_a_valid_email'),
            number: '${label} ' + t('register_page.is_not_a_valid_number'),
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    function registerForm() {
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinishRegister}
                onFinishFailed={onFinishFailed}
                style={{ background: "#fff", padding: 10, flex: 1 }}
                validateMessages={validateMessages}
            >
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}><h1>{t("register_page.register")}</h1></Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}><Text type="danger">{alert}</Text></Col>
                </Row>
                <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }, { required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t('register_page.password')}
                    name="password"
                    rules={[{ required: true, message: t('register_page.please_input_your_email') }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label={t('register_page.confirm_password')}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name={"name"} label={t("register_page.name")} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailLayout}
                >
                    <Checkbox>
                        {t('register_page.i_have_read_the_agreement')} <a href="">{t("register_page.agreement")}</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    Bạn đã có tài khoản? <a href="#" onClick={() => setRegister(false)}>Đăng nhập tại đây</a>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        {t('register_page.register')}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            {register ? registerForm() : <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ background: "#fff", padding: 10, flex: 1 }}
            >
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}><h1>{t("register_page.login")}</h1></Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}><Text type="danger">{alert}</Text></Col>
                </Row>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    Bạn đã chưa có tài khoản? <a href="#" onClick={() => setRegister(true)}>Đăng ký ngay</a>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        {t('register_page.login')}
                    </Button>
                </Form.Item>
            </Form>}

        </div>
    )
}