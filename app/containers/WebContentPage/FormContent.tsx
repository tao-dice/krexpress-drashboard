import React, { Fragment, Suspense, useState } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import get from 'lodash/get';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Row,
  Col,
  PageHeader,
  Descriptions,
  Layout,
  Icon, Form, Radio, Input, Tabs, Button, Modal,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Text from '../../components/Text';
import request, { withAuthenticationHeader } from '../../utils/request';
import HttpErrorHandler from '../../components/HttpErrorHandler';
import { usePageContent } from '../../hooks/usePageContent';
import { FormComponentProps } from 'antd/es/form';
import LoadingIndicator from '../../components/LoadingIndicator';

const { Content } = Layout;

// function htmlEntities(str) {
//   return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// }

function htmlDecode(input) {
  const e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

interface IFormContentProps extends FormComponentProps {
  initialValue?: any;
}

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñçěščřžýúůďťň·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuuncescrzyuudtn------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace('.', '-') // replace a dot by a dash
    // .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
    .replace(/-+/g, '-') // collapse dashes
    .replace(/\//g, ''); // collapse all forward-slashes

  return str;
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const ContentForm = (props) => {
  const {
    initialValue,
  } = props;
  const {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
    validateFields,
  } = props.form;
  const history = useHistory();
  // Get editor content
  getFieldDecorator('content', { initialValue: get(initialValue, 'content', '') });
  const content = getFieldValue('content');
  const { contentBlocks, entityMap } = htmlToDraft(htmlDecode(content));
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(contentBlocks, entityMap),
    ),
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const onUploadResource = (e) => {
    console.log(e);
  };
  const onConfirm = async (payload) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    try {
      const response = await request({
        url: payload.objectId ? `/api/page-content/${payload.objectId}` : '/api/page-content',
        headers: withAuthenticationHeader({}),
        method: payload.objectId ? 'PUT' : 'POST',
        data: {
          ...payload,
          content: markup,
        },
      });
      Modal.success({
        content: 'ทำการบันทึกเนื้อหาสำเร็จ',
      });
      if (!payload.objectId) {
        history.push(`/page-content/form/${response.objectId}`);
      }
    } catch (e) {
      HttpErrorHandler(e.response);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields(async (err, fieldsValue) => {
      if (err) {
        return;
      }
      Modal.confirm({
        title: 'ข้อความยืนยัน',
        content: `คุณค้องการบันทึกเนื้อหานี้ ใช่หรือไม่ ?`,
        onOk: () => onConfirm(fieldsValue),
      });
    });
  };
  const removeTag = (tagIndex) => {
    const tags = getFieldValue('tags');
    setFieldsValue({
      tags: tags.filter((t, i) => i !== tagIndex),
    });
  };
  const removeOgTag = (tagIndex) => {
    const tags = getFieldValue('htmlMeta.og');
    setFieldsValue({
      'htmlMeta.og': tags.filter((t, i) => i !== tagIndex),
    });
  };

  const addNewTag = () => {
    // can use data-binding to get
    const tags = getFieldValue('tags');
    // can use data-binding to set
    // important! notify form to detect changes
    const newTag = tags.concat([{
      key: null,
      value: null,
    }]);
    setFieldsValue({
      tags: newTag,
    });
  };
  const addNewOg = () => {
    // can use data-binding to get
    const tags = getFieldValue('htmlMeta.og');
    // can use data-binding to set
    // important! notify form to detect changes
    const newTag = tags.concat([{
      property: null,
      content: null,
    }]);
    setFieldsValue({
      'htmlMeta.og': newTag,
    });
  };

  const toolbarProps = {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'image',
      'history'],
    image: {
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      uploadEnabled: true,
      uploadCallback: onUploadResource,
    },
  };
  getFieldDecorator('objectId', { initialValue: get(initialValue, 'objectId', null) });
  getFieldDecorator('tags', { initialValue: get(initialValue, 'tags', []) });
  getFieldDecorator('htmlMeta.og', { initialValue: get(initialValue, 'htmlMeta.og', []) });

  const tags = getFieldValue('tags');
  const ogTags = getFieldValue('htmlMeta.og');
  const tagItems = tags.map((t, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'ป้ายกำกับ' : ''}
      required={false}
      key={`tag-${index}`}
    >
      <Input
        placeholder="key"
        style={{ width: '30%', marginRight: 8 }}
        value={t.key}
        onChange={(e) => {
          const tagIndex = tags.findIndex((t, i) => i === index);
          tags[tagIndex].key = e.target.value;
          setFieldsValue({
            tags: tags,
          });
        }}
      />
      <Input
        placeholder="value"
        value={t.value}
        style={{ width: '60%', marginRight: 8 }}
        onChange={(e) => {
          const tagIndex = tags.findIndex((t, i) => i === index);
          tags[tagIndex].value = e.target.value;
          setFieldsValue({
            tags: tags,
          });
        }}
      />
      {/*{getFieldDecorator(`tags[${index}].value`, {*/}
      {/*  rules: [*/}
      {/*    {*/}
      {/*      required: true,*/}
      {/*      message: 'require',*/}
      {/*    },*/}
      {/*  ],*/}
      {/*})(<Input placeholder="value" style={{ width: '60%', marginRight: 8 }} />)}*/}
      <Icon
        className="dynamic-delete-button"
        type="delete"
        onClick={() => removeTag(index)}
      />
    </Form.Item>
  ));
  const ogTagItems = ogTags.map((t, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'meta og' : ''}
      required={false}
      key={`og-${index}`}
    >
      <Input
        placeholder="property"
        value={t.property}
        style={{ width: '30%', marginRight: 8 }}
        onChange={(e) => {
          const ogIndex = ogTags.findIndex((t, i) => i === index);
          ogTags[ogIndex].property = e.target.value;
          setFieldsValue({
            'htmlMeta.og': ogTags,
          });
        }}
      />
      <Input
        placeholder="content"
        value={t.content}
        style={{ width: '60%', marginRight: 8 }}
        onChange={(e) => {
          const ogIndex = ogTags.findIndex((t, i) => i === index);
          ogTags[ogIndex].content = e.target.value;
          setFieldsValue({
            'htmlMeta.og': ogTags,
          });
        }}
      />
      {/*{getFieldDecorator(`tags[${index}].value`, {*/}
      {/*  rules: [*/}
      {/*    {*/}
      {/*      required: true,*/}
      {/*      message: 'require',*/}
      {/*    },*/}
      {/*  ],*/}
      {/*})(<Input placeholder="value" style={{ width: '60%', marginRight: 8 }} />)}*/}
      <Icon
        className="dynamic-delete-button"
        type="delete"
        onClick={() => removeOgTag(index)}
      />
    </Form.Item>
  ));
  const operations = <Button type="primary" htmlType="submit">บันทึก</Button>;
  return (
    <Form onSubmit={handleSubmit}>
      <Tabs
        defaultActiveKey="primary"
        type="card"
        tabBarExtraContent={operations}
      >
        <Tabs.TabPane tab="เนื้อหาหลัก" key="primary">
          <div style={{ maxWidth: '768px' }}>
            <Form.Item label="หัวข้อเนื้อหา" {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: get(initialValue, 'title', null),
                rules: [
                  {
                    required: true,
                    message: 'กรุณากรอก หัวข้อเนื้อหา',
                  },
                ],
              })(
                <Input
                  onBlur={(e) => setFieldsValue({ slug: slugify(e.target.value) })}
                />,
              )}
            </Form.Item>
            <Form.Item label="URL Slug" {...formItemLayout}>
              {getFieldDecorator('slug', {
                initialValue: get(initialValue, 'slug', null),
                rules: [
                  {
                    required: true,
                    message: 'กรุณากรอก URL Slug',
                  },
                ],
              })(
                <Input
                  onBlur={(e) => setFieldsValue({ slug: slugify(e.target.value) })}
                />,
              )}
            </Form.Item>
            <Form.Item label="Keywords" {...formItemLayout}>
              {getFieldDecorator('htmlMeta.keywords', {
                initialValue: get(initialValue, 'htmlMeta.keywords', null),
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="รายละเอียด" {...formItemLayout}>
              {getFieldDecorator('htmlMeta.description', {
                initialValue: get(initialValue, 'htmlMeta.description', null),
              })(
                <Input />,
              )}
            </Form.Item>
            <Form.Item label="การแสดงผล" {...formItemLayout}>
              {getFieldDecorator('accessibility', {
                initialValue: get(initialValue, 'accessibility', 'public'),
              })(
                <Radio.Group>
                  <Radio value="public">สาธารณะ</Radio>
                  <Radio value="private">ส่วนตัว</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </div>
          <Form.Item
            label={<Text tag="label">เนื้อหา</Text>}
          >
            <Editor
              editorState={editorState}
              editorStyle={{ height: '700px' }}
              wrapperClassName="wrapper"
              editorClassName="wysiwyg-editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={toolbarProps}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="ส่วนเสริม"
          key="additional"
        >
          <Row gutter={18}>
            <Col xs={24} sm={12}>
              {ogTagItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={addNewOg} style={{ width: '100%' }}
                >
                  <Icon type="plus" /> เพิ่ม {`<meta og />`}
                </Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {tagItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={addNewTag} style={{ width: '100%' }}
                >
                  <Icon type="plus" /> เพิ่มป้ายกำกับ
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Form>
  );
};
const WrapperContentForm = Form.create<IFormContentProps>({ name: 'web-content-form' })(ContentForm);


const PageContent = (props) => {
  let initialValue = {};
  if (props.match.params) {
    const { data } = usePageContent(`/${props.match.params.objectId}`, { suspense: true });
    initialValue = data;
  }
  return (
    <WrapperContentForm initialValue={initialValue} />
  );
};


const WebFormContent = (props) => {
  const { params } = props.match;
  const pageName = params.objectId ? 'แก้ไขเนื้อหา' : 'สร้างเนื้อหาใหม่';
  const routes = [
    {
      path: '/page-content',
      breadcrumbName: 'จัดการเนื้อหา',
    },
    {
      path: '/page-content/form',
      breadcrumbName: pageName,
    },
  ];

  return (
    <>
      <PageHeader
        style={{
          background: 'white',
        }}
        onBack={() => window.history.back()}
        title={pageName}
        breadcrumb={{
          itemRender: (route, params, routes, paths) => <Link to={route.path}>{route.breadcrumbName}</Link>,
          routes,
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            เนื้อหาคอนเทนต์สำหรับแสดงบนหน้าเว็บ เช่นคู่มือ, วิธีการเล่น คำแนะนำ อื่นๆ
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout className="layout">
        <Content style={{ padding: '1em', margin: '1em 0', background: 'white' }}>
          <Suspense fallback={<LoadingIndicator />}>
            <PageContent {...props} />
          </Suspense>
        </Content>
      </Layout>
    </>
  );
};

export default WebFormContent;
