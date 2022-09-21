import {PageComposer} from '../page-object/pageComposer';
import {getComponentByRole, Button, BaseComponent} from '@jahia/cypress';

describe('System name test', () => {
    const site = 'contentEditorSite';
    let pageComposer: PageComposer;

    before(function () {
        cy.executeGroovy('createSite.groovy', {SITEKEY: site});
        cy.login();
    });

    after(function () {
        cy.logout();
        cy.executeGroovy('deleteSite.groovy', {SITEKEY: site});
    });

    beforeEach(function () {
        pageComposer = PageComposer.visit(site, 'en', 'home.html');
    });

    it('Cannot save with invalid system name', function () {
        const check = function () {
            cy.get('p').contains('Your content couldn’t be saved');
            getComponentByRole(Button, 'content-type-dialog-cancel').click();
            cy.get('p').contains('System name cannot consist of');
        };

        pageComposer.createPage('list\'asasa\'an@##$%#$%@#%');
        check();
    });
});
