/// <reference types="Cypress" />

import { CommonMethods } from "./CommonMethods"

export class StartPage extends CommonMethods {

  //Selectors

  privacyButton = "#btn-privacy-agree"
  tile = ".col-6.col-lg-3.page-card-container"
  tileImage = ".page-card__image-container"
  tileContent = ".page-card__content"
  tileLink = ".page-card__link"
  loginIcon = ".btn-login"


  //Methods

  openToStartPage() {
    cy.visit('https://www.bureau-ice.nl')
    cy.get(this.privacyButton).click()
  }

  checkCountOfTiles(countOfTiles) {
    cy.get(this.tile).should('be.visible')
    cy.get(this.tile).should('have.length',countOfTiles)
  };

  checkIfTileContainsCorrectElements() {
    cy.get(this.tileImage).should('be.visible')
    cy.get(this.tileContent).should('be.visible')
    cy.get(this.tileLink).should('be.visible')
  };

  selectTileIfIsAvailable(buttonText) {
    cy.get(this.tileLink).then((button) => {
      if (button.length > 1) {
        cy.get(this.tileLink).contains(buttonText).click()
      } else {
        cy.log('Button is not available')
      }
    })
  };

  selectTile(text) {
    cy.get(this.tileLink).contains(text).click()
  };

  checkIfLoginIconIsDisplayed() {
    cy.get(this.loginIcon).should('be.visible')
  };  

}

export const startPage = new StartPage();