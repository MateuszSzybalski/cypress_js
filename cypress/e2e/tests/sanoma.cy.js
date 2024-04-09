/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www.bureau-ice.nl/')
  })

  it('start page', () => {
    cy.get('#btn-privacy-agree').click()
    cy.title().should('eq','Bureau ICE - Eerlijk Inzicht geven in ieders kennis en talent')
    cy.get('[class="logo navbar-brand"]').should('be.visible')
    cy.get('[class=hero-home__title]').should('be.visible')
    cy.get('#flexiblecontent').should('be.visible')
    cy.get('.row.page-card-row').should('be.visible')
    cy.get('.col-6.col-lg-3.page-card-container').should('be.visible')
    cy.get('.col-6.col-lg-3.page-card-container').should('have.length','4')
  })
})