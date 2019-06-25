import ImageIcon from '@material-ui/icons/Image';
import * as PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Picker} from '../../../../../../../../DesignSystem/Picker';
import {translate} from 'react-i18next';

import {MediaPickerDialog} from '../MediaPickerDialog';

const MediaPickerEmptyCmp = ({t, id, field, formik, editorContext, setActionContext}) => {
    const [isOpen, setIsOpen] = useState(false);

    setActionContext(prevActionContext => ({
        noAction: true,
        contextHasChange: !prevActionContext.noAction
    }));

    return (
        <>
            <Picker
                readOnly={field.formDefinition.readOnly}
                emptyLabel={t(
                    'content-editor:label.contentEditor.edit.fields.imagePicker.addImage'
                )}
                emptyIcon={<ImageIcon/>}
                onClick={() => setIsOpen(!isOpen)}
            />
            <MediaPickerDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                editorContext={editorContext}
                id={id}
                t={t}
                formik={formik}
                field={field}
            />
        </>
    );
};

MediaPickerEmptyCmp.propTypes = {
    t: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    editorContext: PropTypes.object.isRequired,
    formik: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    setActionContext: PropTypes.func.isRequired
};

export const MediaPickerEmpty = translate()(MediaPickerEmptyCmp);
