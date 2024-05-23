/// <reference types="cypress" />

import { description } from "commander"
import { multiply } from "lodash"
import { textChangeRangeIsUnchanged } from "typescript"

describe('Wikipedia.en', () => {

    beforeEach(() => {
      cy.visit('https://angularjs.realworld.io/')
    })
  
    it('start page', () => {
      cy.intercept('GET', 'https://api.realworld.io/api/tags').as("requestTags")
      cy.title().should('eq','Home — Conduit')
      cy.wait("@requestTags")
      cy.get("@requestTags").then(res =>  {
        console.log(res)
        expect(res.response.statusCode).to.eq(200)
        expect(res.response.body.tags).length(10)
        expect(res.response.body.tags).to.contain("eos").and.to.contain("enim")
        cy.get('[ui-sref="app.login"]').click().then(($singIn) => {
          let href = $singIn.attr('href')
          cy.wrap($singIn).click()
          cy.url().should('contain', href)
        })
      })
    })
  })

describe('Sii', () => {

  it('Sii test', () => {
    cy.viewport(1200, 840)
    cy.visit('https://sii.pl/')
    cy.get('.cmplz-buttons').contains('Akceptuj wszystkie pliki cookies').click()
    cy.intercept('POST', 'https://sii.pl/cdn-cgi/rum?').as('requestContact')
    cy.get('.sii-m-btn-group__item').contains('Wyślij zapytanie').click({force: true})
    cy.wait('@requestContact')
    cy.url().should('contain', '/contact-us/')
    cy.get('#submit_btn').invoke("text").then((buttonText) => {
      expect(buttonText).is.equal('Wyślij wiadomość')
      cy.log(buttonText)
    })
    cy.get('#submit_btn').invoke("text").then((buttonText) => {
      cy.get('#find-us').invoke("text").then((button2Text) => {
        expect(buttonText).is.not.equal(button2Text)
        cy.log(button2Text)
      })
    })
  })

})

// describe('Goal.com', () => {
//   it('Visits homepage', () => {    
//       cy.visit('https://www.goal.com/en')
//       cy.intercept('*cnsnt.goal.com*', (id) => {
//         id.destroy();
//       })
//       //cy.viewport(1536, 960)
//   })
// })