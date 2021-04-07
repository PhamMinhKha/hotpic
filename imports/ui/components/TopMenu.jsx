import React, { useState, useContext, useEffect } from 'react'
import { Menu, Switch, Modal, Upload, Button, message, Form, Input, Select, Image as ImageAnt } from 'antd';
import { SettingOutlined, UserOutlined, ProfileOutlined, LogoutOutlined, CloudUploadOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Images from '../../api/UploadShare';
import { FilesCollection } from 'meteor/ostrio:files';
/* Import context */
import ConfigContext from '../ConfigContext';
/* Đa ngôn ngữ */
import { useTranslation } from 'react-i18next';
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const { SubMenu } = Menu;
const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default function TopMenu({ changeLanguage }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [links, setLinks] = useState([]);
    const [listFile, setListFile] = useState([]);
    const [imagesUploaded, setImagesUploaded] = useState([]);
    const [cover, setCover] = useState(null);
    const user = useTracker(() => Meteor.user());
    const [form] = Form.useForm();
    /* Đa ngôn ngữ */
    const { t, i18n } = useTranslation();
    /* Kích hoạt menu được chọn */
    const [activeMenu, setActivemenu] = useState('hot');
    /* Lấy context */
    const [config, setConfig] = useContext(ConfigContext);


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function updateFileListAfterUpload() {
        console.log(listFile);
        let updateFileList = listFile.map((value, index) => {
            let imageIsFound = imagesUploaded.filter(value1 => value1.uid === value.uid)
            value._id = imageIsFound._id;
            return value;
        })
        console.log(updateFileList)
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    handleClick = e => {
        setActivemenu(e.key)
    };
    handleChangeTheme = e => {
        setConfig({ ...config, theme: config.theme === 'dark' ? 'light' : 'dark' })
    }
    handleChangeLanguage = e => {
        setConfig({ ...config, lng: e })
        changeLanguage(e);
    }
    handleLogout = e => {
        Meteor.logout();
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (e) => {
        e.preventDefault();
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function handleChangeFile({ fileList }) {
        setListFile(fileList);
    }
    function handleUploads(e) {
        console.log(e)
        createReader(e, false, function (width, height) {
            const upload = Images.insert({
                file: e,
                chunkSize: 'dynamic',
                meta: {
                    width: width,
                    height: height,
                    uid: e.uid
                }
            }, false);
            upload.on('start', function () {
                // console.log('hire', this)
            });
            upload.on('uploaded', function (err) {
                if (err) {
                    message.error(err);
                }
            })
            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert(`Error during upload: ${error}`);
                } else {
                    fileObj.source = Images.link(fileObj);
                    let tmp_array = imagesUploaded;
                    tmp_array.push(fileObj);
                    // console.log('Hình đã upload:', tmp_array);
                    setImagesUploaded(tmp_array);
                }
                // console.log(fileObj)
                // const collectionImages = new FilesCollection({ collectionName: 'Images' });

                // Usage:
                // console.log(Images.link(fileObj));
                // Images.collection.find({}).forEach(function (fileRef) {
                //     console.log(Images.link(fileRef));
                // });


            });
            upload.start();
        });

        // console.log(e);
        // console.log(links);
    }

    // function handleChangeFile(e) {
    //     console.log(e);
    // }
    function createReader(file, whenReady, callback) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            var image = new Image();
            image.onload = function (evt) {
                var width = this.width;
                var height = this.height;
                if (whenReady) whenReady(width, height);
                callback(width, height);
            };
            image.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }

    function handleBeforeUpload(file, list) {
        if (!user) {
            message.error(`You are not login!`);
        }
        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
            message.error(`${file.name} is not a file`);
        }
        else {
            // console.log('here')
            // console.log(list);
            return true
        }
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    function handleNewPost(data) {
        // console.log(imagesUploaded);

        data.post_images = imagesUploaded;
        if (imagesUploaded.length === 1) {
            data.post_type = "single image";
        }
        else {
            data.post_type = "gallery"
        }
        data.cover_uid = cover.uid;
        let t = Meteor.call("posts.insert", data, function (error, result) {
            if (error) {
                message.error('error');
            } else {
                //success
                setListFile([]);
                setCover(null);
                form.resetFields();
                console.log(result);
            }
        });
    }
    function onRemoveImage(file) {
        let new_images_uploaded = imagesUploaded.filter(value => value.meta.uid !== file.uid)
        Images.remove({ "meta.uid": file.uid }, (error) => {
            if (error) {
                console.error(`File wasn't removed, error:  ${error.reason}`);
            } else {
                console.info('File successfully removed');
            }
            setImagesUploaded(new_images_uploaded);
        });
    }
    function handlePreview(file) {
        // console.log(file);
        setCover(file);
    }
    return (
        <>
            <Menu onClick={(e) => handleClick(e)} selectedKeys={activeMenu} mode="horizontal" theme={config.theme}>
                <Menu.Item key="hot" >
                    <Link to="/">{t('menu.hot')}</Link>
                </Menu.Item>
                <Menu.Item key="new"  >
                    {t('menu.new')}
                </Menu.Item>
                <Menu.Item key="top_week"  >
                    {t('menu.top_week')}
                </Menu.Item>
                {user ? (
                    <>
                        <SubMenu key="UserMenu" icon={<UserOutlined />} title={user.profile.name} style={{ float: 'right' }}>
                            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Language">
                                <Menu.Item key="language:vi" onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</Menu.Item>
                                <Menu.Item key="language:en" onClick={() => handleChangeLanguage('en')}>English</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="profile" icon={<ProfileOutlined />}><Link to="profile">Profile</Link></Menu.Item>
                            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => handleLogout()}>Logout</Menu.Item>
                        </SubMenu>
                        <Menu.Item style={{ float: 'right' }} icon={<CloudUploadOutlined />} onClick={() => setIsModalVisible(true)}>
                            {t("post.post")}
                        </Menu.Item>
                    </>) : (
                    <Menu.Item style={{ float: 'right' }}>
                        <Link to="login">{t("menu.register_login")}</Link>
                    </Menu.Item>
                )}
                {user ? null : (<SubMenu key="SubMenu" icon={<SettingOutlined />} title="Language" style={{ float: "right" }}>
                    <Menu.Item key="language:vi" onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</Menu.Item>
                    <Menu.Item key="language:en" onClick={() => handleChangeLanguage('en')}>English</Menu.Item>
                </SubMenu>)}
                <Menu.Item className="language_hover" style={{ float: 'right' }}>
                    <Switch onChange={() => handleChangeTheme()} className="themeChange" checkedChildren={t('menu.light')} unCheckedChildren={t('menu.dark')} defaultChecked />
                </Menu.Item>
            </Menu>
            <Modal title={t("post.new_post")} visible={isModalVisible} footer={null}>
                <Form
                    form={form}
                    {...layout}
                    name="new_post"
                    onFinish={(e) => handleNewPost(e)}
                >
                    <Form.Item
                        label={t("post.title")}
                        name="post_title"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("post.description")}
                        name="post_description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={t("post.images")} name="post_images" rules={[{ required: true }]}>
                        <Upload
                            // action={(e) => handleUploads(e)}
                            listType="picture-card"
                            multiple
                            data={(e) => handleUploads(e)}
                            onChange={(e) => handleChangeFile(e)}
                            fileList={listFile}
                            maxCount={50}
                            beforeUpload={(file, list) => handleBeforeUpload(file, list)}
                            onPreview={(file) => handlePreview(file)}
                            onRemove={(file) => onRemoveImage(file)}
                        // showUploadList={{ showPreviewIcon: false }}
                        >
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <ImageAnt
                        width={100}
                        height={100}
                        src={cover ? cover.thumbUrl : "error"}
                        fallback="data:image/png;base64,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"
                    />
                    <Form.Item label={t("post.category")}
                        name="post_category"
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item {...layout}>
                        <Button type="primary" htmlType="submit">
                            {t("post.submit")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
