import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Create} from './Create';
import {Edit} from './Edit';
import {ContentEditorConfigContextProvider, ContentEditorContextProvider} from '~/contexts';
import {Constants} from '~/ContentEditor.constants';

export const ContentEditor = props => {
    const {mode, envProps} = props;
    const [expanded, setExpanded] = useState({});

    return (
        <ContentEditorConfigContextProvider config={{...props, expanded, setExpanded}}>
            <ContentEditorContextProvider useFormDefinition={envProps.useFormDefinition}>
                {mode === 'edit' ? <Edit/> : <Create/>}
            </ContentEditorContextProvider>
        </ContentEditorConfigContextProvider>
    );
};

ContentEditor.propTypes = {
    mode: PropTypes.oneOf([Constants.routes.baseCreateRoute, Constants.routes.baseEditRoute]).isRequired,
    envProps: PropTypes.object.isRequired
};
