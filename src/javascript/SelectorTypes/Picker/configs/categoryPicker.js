import {Constants} from '~/SelectorTypes/Picker/Picker2.constants';
import {mergeDeep} from '~/SelectorTypes/Picker/Picker2.utils';
import {ContentPickerConfig} from '~/SelectorTypes/Picker/configs/ContentPickerConfig';
import {Collections} from '@jahia/moonstone';
import {PickerTreeQueryHandler} from '~/SelectorTypes/Picker/accordionItems/QueryHandlers/queryHandlers';
import {renderer} from '~/SelectorTypes/Picker/accordionItems/renderer';
import React from 'react';

export const registerCategoryPicker = registry => {
    registry.add(Constants.pickerConfig, 'category', mergeDeep({}, ContentPickerConfig, {
        searchSelectorType: 'jnt:category',
        selectableTypesTable: ['jnt:category'],
        accordionMode: `picker-${Constants.ACCORDION_ITEM_TYPES.CATEGORY}`,
        pickerTable: {
            columns: ['name']
        },
        pickerInput: {
            emptyLabel: 'content-editor:label.contentEditor.edit.fields.contentPicker.modalCategoryTitle'
        },
        pickerDialog: {
            dialogTitle: 'content-editor:label.contentEditor.edit.fields.contentPicker.modalCategoryTitle',
            displayTree: false,
            displaySiteSwitcher: false
        }
    }));

    registry.add(Constants.ACCORDION_ITEM_NAME, `picker-${Constants.ACCORDION_ITEM_TYPES.CATEGORY}`, {
        targets: ['category:50'],
        icon: <Collections/>,
        label: 'content-editor:label.contentEditor.picker.navigation.categories',
        defaultPath: () => '/sites/systemsite/categories',
        canDisplayItem: ({selectedNode, folderNode}) => selectedNode ? /^\/sites\/systemsite\/categories\/.*/.test(selectedNode.path) : /^\/sites\/systemsite\/categories((\/.*)|$)/.test(folderNode.path),
        defaultSort: {orderBy: 'displayName', order: 'ASC'},
        queryHandler: PickerTreeQueryHandler,
        config: {
            rootPath: '/categories',
            selectableTypes: ['jnt:category'],
            openableTypes: ['jnt:category']
        }
    }, renderer);
};
