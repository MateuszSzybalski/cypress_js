/// <reference types="Cypress" />

import { Common } from "./Common"

export class SalesAndMarketingPage extends Common{

    //selectors
    sideBar = '.sidebar-item'
    sideBarLabel = '.sidebar-item-label'
    saveButton = '#DetailForm_save-label'
    filterText = '#filter_text'
    listViewNameLink = '.listViewNameLink'
    detailLink = '.detailLink'
    detailFormSubPanels = '#DetailForm-subpanels'
    detailFormPersonalData = '#DetailForm_personal_data-label'
    formValue = '.form-value'
    formHeader = '#_form_header'
    mainSection = '#main-0'


    fillTheFormFixture() {
        cy.fixture("replay").then((userData) => {
          cy.get('#DetailFormfirst_name-input').type(userData.firstName)
          cy.get('#DetailFormlast_name-input').type(userData.lastName)
          cy.get('#DetailFormcategories-input-body').click({force: true})
          cy.get('#DetailFormcategories-input-search-text').type(userData.role1).type('{enter}')
          cy.get('#DetailFormcategories-input-search-text').type(userData.role2).type('{enter}')
          cy.get('#DetailFormbusiness_role-input-label').click({force: true})
          cy.get('#DetailFormbusiness_role-input-popup').contains(userData.title).click()
        }) 
    }
    fillTheFormByText(firstName, lastName, businessRole1, businessRole2, title) {
          cy.get('#DetailFormfirst_name-input').type(firstName)
          cy.get('#DetailFormlast_name-input').type(lastName)
          cy.get('#DetailFormcategories-input-body').click({force: true})
          cy.get('#DetailFormcategories-input-search-text').type(businessRole1).type('{enter}')
          cy.get('#DetailFormcategories-input-search-text').type(businessRole2).type('{enter}')
          cy.get('#DetailFormbusiness_role-input-label').click({force: true})
          cy.get('#DetailFormbusiness_role-input-popup').contains(title).click()
    }

    filterByText(text) {
        cy.get(this.filterText).type(text).type('{enter}')
    }

    filterByFirstNameAndLastNameFromFixture() {
        cy.fixture("replay").then((userData) => {
          cy.get(this.filterText).type(userData.firstName + ' ' + userData.lastName, "{'enter'}")
        })
    }

    clickElementWithValuesFromFixture() {
        cy.fixture("replay").then((names) => {
          cy.get(this.listViewNameLink).contains(names.firstName + ' ' + names.lastName).click()
        })
    }

    checkIfNamesAndTitleAreCorrect() {
        cy.fixture('replay').then((nameTitle) => {
          cy.get(this.formHeader).contains(nameTitle.firstName + ' ' + nameTitle.lastName)
          cy.get(this.formValue).contains(nameTitle.title).parents(this.mainSection)
        })
    }

  }
  
  export const salesAndMarketingPage = new SalesAndMarketingPage();