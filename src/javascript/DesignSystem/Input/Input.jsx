import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {InputBase, InputAdornment, withStyles} from '@material-ui/core';
import NumberFormat from 'react-number-format';

const styles = theme => {
    // Todo: DESIGN-178 - use theme colors
    theme.palette.field.alpha = '#F9FBFC';
    theme.palette.ui.omega = '#E0E6EA';
    theme.palette.ui.zeta = '#C1C8D5';
    return {
        root: {
            borderRadius: '1px',
            background: theme.palette.field.alpha,
            border: `1px solid ${theme.palette.ui.omega}`,
            boxSizing: 'border-box',
            '&:hover:not($inputDisabled):not($focused):not($error):not($readOnly)': {
                border: `1px solid ${theme.palette.ui.zeta}`
            },
            fontSize: theme.typography.iota.fontSize,
            transitionDuration: '.3s',
            padding: '3px 0px 3px 12px'
        },
        focused: {
            border: `1px solid ${theme.palette.brand.alpha}`
        },
        readOnly: {
            background: theme.palette.ui.epsilon,
            border: `1px solid ${theme.palette.ui.omega}`
        },
        // Hack for disabled style as the default disabled style applies on both container AND input element.
        inputDisabled: {
            background: theme.palette.ui.epsilon,
            border: `1px solid ${theme.palette.ui.zeta}`,
            color: theme.palette.font.gamma
        },
        error: {
            border: `1px solid ${theme.palette.support.alpha}`
        },
        inputAdornedStart: {
            transitionDuration: '.3s'
        },
        inputAdornedStartFocus: {
            color: theme.palette.brand.alpha
        },
        inputAdornedStartError: {
            color: theme.palette.support.alpha
        },
        inputAdornedEndReadonly: {
            pointerEvents: 'none !important'
        }
    };
};

const InputCmp = ({classes, disabled, error, onBlur, onFocus, readOnly, variant, ...others}) => {
    const [focus, setFocus] = useState(false);
    const handleFocus = () => {
        onFocus();
        setFocus(true);
    };

    const handleBlur = () => {
        onBlur();
        setFocus(false);
    };

    const {icon, interactive} = variant;

    const {
        readOnly: readOnlyClass, inputDisabled, inputAdornedStart, inputAdornedStartFocus,
        inputAdornedStartError, inputAdornedEndReadonly, ...containerClasses
    } = classes;

    return (
        <InputBase
            classes={containerClasses}
            className={`${readOnly ? readOnlyClass : ''} ${disabled ? inputDisabled : ''}`}
            disabled={disabled}
            error={error}
            readOnly={readOnly}
            startAdornment={icon &&
            <InputAdornment
                className={`${inputAdornedStart} ${!readOnly && focus ? inputAdornedStartFocus : ''} ${!readOnly && error ? inputAdornedStartError : ''}`}
                position="start"
            >
                {icon}
            </InputAdornment>}
            endAdornment={interactive &&
            <InputAdornment
                className={`${readOnly ? inputAdornedEndReadonly : ''}`}
                position="end"
            >
                {interactive}
            </InputAdornment>}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...others}
        />
    );
};

const WrappedInputCmp = ({decimalSeparator, decimalScale, type, ...others}) => {
    if (type && type === 'number') {
        return (
            <NumberFormat customInput={InputCmp}
                          decimalScale={decimalScale}
                          decimalSeparator={decimalSeparator}
                          {...others}
            />
        );
    }

    return <InputCmp {...others}/>;
};

InputCmp.defaultProps = {
    disabled: false,
    defaultValue: undefined,
    error: false,
    fullWidth: false,
    inputProps: {},
    id: undefined,
    name: undefined,
    onBlur: () => {
    },
    onChange: () => {
    },
    onFocus: () => {
    },
    readOnly: false,
    value: undefined,
    variant: {}
};

InputCmp.propTypes = {
    classes: PropTypes.object.isRequired,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    variant: PropTypes.shape({
        icon: PropTypes.node,
        interactive: PropTypes.node
    })
};

WrappedInputCmp.defaultProps = {
    decimalSeparator: '.',
    decimalScale: undefined,
    type: 'text'
};

WrappedInputCmp.propTypes = {
    decimalSeparator: PropTypes.string,
    decimalScale: PropTypes.number,
    type: PropTypes.string
};

export const Input = withStyles(styles)(WrappedInputCmp);

Input.displayName = 'Input';
