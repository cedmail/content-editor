import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs, boolean, text} from '@storybook/addon-knobs';
import doc from './MultipleInput.md';
import {DSProvider} from '@jahia/design-system-kit';

import {MultipleInput} from './MultipleInput';

const suggestions = [
    {label: 'Afghanistan'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
    {label: 'Algeria'},
    {label: 'American Samoa'},
    {label: 'Andorra'},
    {label: 'Angola'},
    {label: 'Anguilla'},
    {label: 'Antarctica'},
    {label: 'Antigua and Barbuda'},
    {label: 'Argentina'},
    {label: 'Armenia'},
    {label: 'Aruba'},
    {label: 'Australia'},
    {label: 'Austria'},
    {label: 'Azerbaijan'},
    {label: 'Bahamas'},
    {label: 'Bahrain'},
    {label: 'Bangladesh'},
    {label: 'Barbados'},
    {label: 'Belarus'},
    {label: 'Belgium'},
    {label: 'Belize'},
    {label: 'Benin'},
    {label: 'Bermuda'},
    {label: 'Bhutan'},
    {label: 'Bolivia, Plurinational State of'},
    {label: 'Bonaire, Sint Eustatius and Saba'},
    {label: 'Bosnia and Herzegovina'},
    {label: 'Botswana'},
    {label: 'Bouvet Island'},
    {label: 'Brazil'},
    {label: 'British Indian Ocean Territory'},
    {label: 'Brunei Darussalam'}
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label
}));

storiesOf('MultipleInput', module)
    .addDecorator(withKnobs)
    .add(
        'MultiSelect',
        () => (
            <DSProvider>
                <MultipleInput
                    options={suggestions}
                    readOnly={boolean('readOnly', false)}
                    placeholder={text('placeholder', '')}
                    noOptionsMessage={() => 'No results found'}
                />
            </DSProvider>
        ),
        {
            notes: {markdown: doc}
        }
    )
    .add(
        'Creatable Select',
        () => (
            <DSProvider>
                <MultipleInput
                    creatable
                    options={suggestions}
                    placeholder={text('placeholder', '')}
                    readOnly={boolean('readOnly', false)}
                    formatCreateLabel={val => `Create tag "${val}"`}
                />
            </DSProvider>
        ),
        {
            notes: {markdown: doc}
        }
    );
