import React from 'react';
import {shallow} from '@jahia/test-framework';

import {RichTextCmp} from './RichText';

const RICH_TEXT_COMPONENT_TAG = 'CKEditor';

describe('RichText component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'richID',
            field: {
                name: 'x',
                displayName: 'x',
                readOnly: false,
                selectorType: 'RichText'
            },
            formik: {
                setFieldValue: () => {},
                values: []
            }
        };
        wrapper = shallow(<RichTextCmp {...props}/>);
    });

    it('should contain one RichText component', () => {
        expect(wrapper.find(RICH_TEXT_COMPONENT_TAG).length).toBe(1);
    });

    it('should obtain its initial value from value prop', () => {
        props.value = 'some dummy value';

        expect(wrapper.setProps(props)
            .find(RICH_TEXT_COMPONENT_TAG)
            .prop('data')
        ).toEqual('some dummy value');
    });

    it('should call formik.setFieldValue on change', () => {
        const dummyEditor = {
            getData: () => 'some dummy value'
        };

        props.formik.setFieldValue = jest.fn();

        wrapper.setProps(props)
            .find(RICH_TEXT_COMPONENT_TAG)
            .simulate('change', {editor: dummyEditor});

        expect(props.formik.setFieldValue.mock.calls.length).toBe(1);
        expect(props.formik.setFieldValue.mock.calls).toEqual([[
            props.id, dummyEditor.getData(), true
        ]]);
    });

    it('should be readOnly when formDefinition say so', () => {
        testReadOnly(true);
        testReadOnly(false);
    });

    let testReadOnly = function (readOnly) {
        props.field.readOnly = readOnly;

        expect(wrapper.setProps(props)
            .find(RICH_TEXT_COMPONENT_TAG)
            .prop('readOnly')
        ).toEqual(readOnly);
    };
});
