/// <reference types="cypress" />

const { description } = require("commander")
const { multiply } = require("lodash")

describe('Wikipedia.en', () => {

  context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://en.wikipedia.org/')
    })
  
    it('start page', () => {
      cy.title().should('eq','Wikipedia, the free encyclopedia')
      cy.get('#vector-page-tools-dropdown').then(($dropdown) => {
          cy.wrap($dropdown).click()
          cy.get('.mw-list-item').contains('Special pages').click()
      })
      cy.url().should('contain','Special:SpecialPages').log('Url contains correct parameter')
      cy.get('#content').then(($content) => {
        cy.get('#firstHeading').parent($content).should('be.visible')
        cy.get($content).should('be.visible')
        cy.get($content).children('#bodyContent').should('be.visible')
      })
      cy.go("back")
      cy.url().should('contain', 'Main_Page').log('Url contains correct parameter')
      cy.get('#vector-page-tools-dropdown-checkbox').then($dropdowns => {
        cy.wrap($dropdowns).click()
        cy.get('.vector-menu-content-list').parents('#p-tb').then( listItem => {
          //const itemText = listItem.text()
          //cy.wrap(listItem).should('contain', itemText)
          cy.wrap(listItem).should('be.visible')
        })
      })
      cy.get('.cdx-text-input__input').type('Walesa')    
      cy.get('button').contains('Search').click()
    })
  })
})