/// <reference types="cypress" />

import { ogolne } from "../POM/Ogolne"

describe('Replay', () => {
  
beforeEach(() => {
      cy.visit('https://demo.1crmcloud.com/')
    })
  
    it('Scenario 1 – Create contact:', () => {
        cy.fixture("replay").then((loginCredentials) => {
        cy.get('#login_user').type(loginCredentials.username)
        cy.get('#login_pass').type(loginCredentials.password)
        })
        cy.intercept('POST','**/json.php?action=get_menu_structure').as('requestTag')
        cy.get('#login_button').click()
        cy.wait('@requestTag')
        cy.get('#grouptab-1').should('have.attr', 'title', 'Sales & Marketing')
        cy.intercept('GET', '**?module=Contacts&action=EditView&return_module=Contacts&return_action=DetailView').as('requestTag2')
        cy.get('.sidebar-item').contains('Create Contact').click()
        cy.wait('@requestTag2')
        cy.wait(2000)
        cy.fixture("replay").then((userData) => {
          cy.get('#DetailFormfirst_name-input').type(userData.firstName)
          cy.get('#DetailFormlast_name-input').type(userData.lastName)
          cy.get('#DetailFormcategories-input-body').click({force: true})
          cy.get('#DetailFormcategories-input-search-text').type(userData.role1).type('{enter}')
          cy.get('#DetailFormcategories-input-search-text').type(userData.role2).type('{enter}')
          cy.get('#DetailFormbusiness_role-input-label').click({force: true})
          cy.get('#DetailFormbusiness_role-input-popup').contains(userData.title).click()
        })         
        cy.get('#DetailForm_save-label').click()
        cy.wait(2000)
        ogolne.saveValue('.listViewNameLink', 0, 'nameAlias')
        cy.get('.sidebar-item-label').contains('Contacts').click({force:true})
        cy.get('#filter_text').type('Tester1').type('{enter}')
        cy.wait(2000)
        ogolne.compareAliasVal('.listViewNameLink', 'nameAlias', 0)
        cy.intercept('GET', '**module=Contacts&action=DetailView&record*').as('reqCon')
        cy.fixture("replay").then((names) => {
          cy.get('.listViewNameLink').contains(names.firstName + ' ' + names.lastName).click()
        })
        cy.get('.listViewNameLink').contains('Tester1' + ' ' + 'Test').click()
        cy.wait('@reqCon')
        cy.get('#DetailForm-subpanels').should('be.visible')
        cy.url().should('contain', 'Contacts&action')
        cy.get('#DetailForm_personal_data-label').click()
        cy.fixture('replay').then((nameTitle) => {
          cy.get('.listViewNameLink').contains(nameTitle.firstName + ' ' + nameTitle.lastName)
          cy.get('form-value').parent('.column.form-cell.sm-6.cell-business_role.span-1').contains(nameTitle.title)
        })
      })

      it('Scenario 2 – Run report:', () => {
        cy.fixture("replay").then((loginCredentials) => {
        cy.get('#login_user').type(loginCredentials.username)
        cy.get('#login_pass').type(loginCredentials.password)
        })
        cy.intercept('POST','**/json.php?action=get_menu_structure').as('requestTag')
        cy.get('#login_button').click()
        cy.wait('@requestTag')
        cy.get('#grouptab-5').should('have.attr', 'title', 'Reports & Settings').click()
        cy.get('#filter_text').type('Project Profitability').type('{enter}')
        cy.intercept('GET', '**/include/javascript/dnduploads.js').as('req')
        cy.get('.detailLink').contains('Project Profitability').click()
        cy.wait('@req')
        cy.intercept('POST', '**/async.php').as('req1')
        cy.get('[name="FilterForm_applyButton"]').click({force: true})
        cy.wait('@req1')
        cy.get('table').find('tr').should('have.length.at.least', 2)
      })
    })