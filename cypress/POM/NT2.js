/// <reference types="Cypress" />

import { CommonMethods } from "./CommonMethods"

export class NT2 extends CommonMethods {

    //Selectors

    buttonDirectContact = "#cta-hero"


    //Methods

    checkUrlPath() {
        cy.url().should('include', '/nt2/')
    }

    checkIfDirectContactButtonIsDisplayed() {
      cy.get(this.buttonDirectContact).should('be.visible').and('contain','Direct contact')
    }

    clickDirectContactButton() {
      cy.get(this.buttonDirectContact).click()
    }
  
  }
  
  export const nt2 = new NT2();