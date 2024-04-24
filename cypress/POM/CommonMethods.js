/// <reference types="Cypress" />

export class CommonMethods {

    //Selectors
    
    logo = ".logo.navbar-brand"
    loginIcon = ".btn-login"
  

    //Methods

    checkIfTitlePageIsCorrect(title) {
      cy.title().should('include', title)
    };
  
    checkIfLogoIsDisplayed() {
      cy.get(this.logo).should('be.visible')
      cy.log('logo logo logo logo')
    };
  
    checkIfLoginIconIsDisplayed() {
      cy.get(this.loginIcon).should('be.visible')
    };  
  
  }
  
  export const commonMethods = new CommonMethods();