/// <reference types="Cypress" />

import { CommonMethods } from "./CommonMethods"

export class DirectContact extends CommonMethods {

    //Selectors

    formWrapper = "#gform_wrapper_44"
    captcha = "#rc-anchor-container"
    captchaCheckbox = "#recaptcha-anchor"

    formWrapper = '#input_44_9'
    companyForm = '#input_44_6'
    functionForm = '#input_44_11'
    nameForm = '#input_44_2'
    surnameForm = '#input_44_4'
    numberForm = '#input_44_13'
    emailForm = '#input_44_5'
    checkboxMandatoryForm = '#label_44_19_1'


    //Methods

    checkUrlPath() {
        cy.url().should('include', '/nt2/contact-nt2/')
    }

    checkIfFormWrapperIsDisplayed() {
        cy.get(this.formWrapper).should('be.visible')
        cy.log('wrapper is displayed')
    }

    fillTheForm1() {
        cy.fixture("example").then((user) => {
        cy.get(this.formWrapper).select(3)
        cy.get(this.companyForm).type(user.company)
        cy.get(this.functionForm).type(user.function)
        cy.get(this.nameForm).type(user.name)
        cy.get(this.surnameForm).type(user.surname)
        cy.get(this.numberForm).type(user.number)
        cy.get(this.emailForm).type(user.email)
        cy.get(this.checkboxMandatoryForm).click({ force: true })
        })
    }

    fillTheForm2() {
        cy.fixture("userData").then((user) => {
        cy.get(this.formWrapper).select(3)
        cy.get(this.companyForm).type(user.company.name)
        cy.get(this.functionForm).type(user.company.function)
        cy.get(this.nameForm).type(user.userData.name)
        cy.get(this.surnameForm).type(user.userData.surname)
        cy.get(this.numberForm).type(user.userData.number)
        cy.get(this.emailForm).type(user.userData.email)
        cy.get(this.checkboxMandatoryForm).click({ force: true })
        })
    }

  }
  
  export const directContact = new DirectContact();