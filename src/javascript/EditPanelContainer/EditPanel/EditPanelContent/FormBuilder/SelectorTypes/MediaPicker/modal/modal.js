import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {useImagesData} from './modal.gql-queries';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import {Typography} from '@jahia/ds-mui-theme';
import {ImageList} from '../../../../../../../design-sytem/image-list/image-list';
import CircularProgress from '@material-ui/core/CircularProgress';

import {compose} from 'react-apollo';
import {withStyles} from '@material-ui/core';
import {translate} from 'react-i18next';
import {NodeTrees} from '@jahia/react-material';

const styles = theme => ({
    drawerPaper: {
        width: '15vw',
        backgroundColor: theme.palette.ui.beta
    },
    modalContent: {
        width: '85vw',
        marginLeft: '15vw',
        padding: theme.spacing.unit
    },
    selectImg: {
        height: '30vh',
        width: '30vh'
    },
    actions: {
        position: 'fixed',
        width: '85vw',
        backgroundColor: theme.palette.ui.epsilon,
        bottom: 0,
        padding: `0 ${theme.spacing.unit * 4}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    actionButtons: {
        '& button': {
            marginRight: theme.spacing.unit * 2
        }
    },
    actionUpload: {
        display: 'flex',
        alignItems: 'center',
        '& label': {
            marginLeft: '0.7rem'
        },
        '& input': {
            display: 'none'
        }
    },

    // Tree css
    listItem: {
        color: theme.palette.primary.contrastText
    }
});

export const ModalCmp = ({onCloseDialog, classes, idInput, t, site, lang}) => {
    const [selectedPath, setSelectedPath] = useState('/sites/' + site + '/files');
    const [openPaths, setOpenPaths] = useState([]);
    const {images, error, loading} = useImagesData(selectedPath);

    if (loading) {
        return (
            <section>
                <CircularProgress/>
            </section>
        );
    }

    return (
        <>
            <Drawer
                open
                component="nav"
                variant="permanent"
                anchor="left"
                classes={{
                 paper: classes.drawerPaper
               }}
            >
                <NodeTrees isOpen
                           path={selectedPath}
                           openPaths={openPaths}
                           siteKey={site}
                           lang={lang}
                           nodeTreeConfigs={[{
                               rootPath: '/files',
                               selectableTypes: ['jnt:folder'],
                               type: 'files',
                               openableTypes: ['jnt:folder'],
                               rootLabel: 'Browse files',
                               key: 'browse-tree-files'
                           }]}
                           setPath={path => setSelectedPath(path)}
                           classes={{
                               listItem: classes.listItem
                           }}
                           openPath={path => setOpenPaths(previousOpenPaths => previousOpenPaths.concat([path]))}
                           closePath={path => setOpenPaths(previousOpenPaths => previousOpenPaths.filter(item => item !== path))}
                           closeTree={() => console.log('close tree')}
                />
            </Drawer>
            <main className={classes.modalContent}>
                <ImageList component="section" images={images} error={error}/>

                <div className={classes.actions}>
                    <div className={classes.actionUpload}>
                        <CloudUpload/>
                        <Typography>drag and drop your files here, or</Typography>
                        <label>
                            <Typography>Browse your computer</Typography>
                            <input type="file" id={idInput}/>
                        </label>
                    </div>
                    <div className={classes.actionButtons}>
                        <Button type="button" color="secondary" onClick={onCloseDialog}>
                            {t(
                                'content-editor:label.contentEditor.edit.fields.imagePicker.modalCancel'
                            )}
                        </Button>
                        <Button disabled variant="contained" color="primary" type="button">
                            {t(
                                'content-editor:label.contentEditor.edit.fields.imagePicker.modalDone'
                            )}
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

ModalCmp.defaultProps = {
    classes: {}
};

ModalCmp.propTypes = {
    t: PropTypes.func.isRequired,
    idInput: PropTypes.string.isRequired,
    classes: PropTypes.object,
    lang: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    onCloseDialog: PropTypes.func.isRequired
};

export const Modal = compose(
    translate(),
    withStyles(styles)
)(ModalCmp);
